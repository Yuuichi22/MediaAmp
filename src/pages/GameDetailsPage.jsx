import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameInfo } from "../service/gamesService";
import { Row, Col, Container, Button } from "react-bootstrap";
import { formatDateToWords } from "../utils/utility";
import { useDispatch, useSelector } from "react-redux";
import { addToLibrary } from "../app/features/Library/librarySlice";
import { LoaderCircle } from "lucide-react"

const GameDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const library = useSelector((state) => state.library.list);
  const [gameInfo, setGameInfo] = useState(null);
  const [screenshots, setScreenShots] = useState([]);
  const [error, setError] = useState(null);

  // Check if the game is already in the library
  const isSaved = library.some((game) => game.id === Number(id));

  useEffect(() => {
    getGameInfo(id)
      .then((data) => setGameInfo(data))
      .catch((err) => {
        console.error("Failed to fetch game info:", err);
        setError("Error loading game details.");
      });

    // Fetch screenshots
    const params = new URLSearchParams({
      key: import.meta.env.VITE_RAWG_API_KEY,
    });

    fetch(`${import.meta.env.VITE_RAWG_BASE_URI}/games/${id}/screenshots?${params}`)
      .then((res) => res.json())
      .then((data) => setScreenShots(data.results || []))
      .catch((err) => console.error("Failed to fetch screenshots:", err));
  }, [id]);

  if (error) return <div style= {{paddingTop : "80px"}} className="text-center text-danger">{error}</div>;
  if (!gameInfo) return  <div style= {{paddingTop : "80px"}}>
  <div style={{width:"max-content",margin:"auto"}}>
  <LoaderCircle className="rotating " />
  </div>
</div>

  return (
    <div
      style={{
        paddingTop: "80px",
        margin: "auto",
        backgroundColor: gameInfo.dominant_color || "#f8f9fa",
      }}
    >
      <Container>
        <Row className="align-items-center p-5">
          {/* Game Details */}
          <Col md={6} className="m-2">
            <h1 className="text-wrap" style={{ width: "400px" }}>
              {gameInfo.name}
            </h1>
            <span>Released on {formatDateToWords(gameInfo.released)}</span>
            <div className="buttons d-flex gap-2 mt-5">
              <Button
                variant="dark"
                disabled={isSaved}
                onClick={() => dispatch(addToLibrary(gameInfo))}
              >
                {isSaved ? "Added" : "Add To Library"}
              </Button>
              <Button variant="primary" disabled={!isSaved} onClick={() => navigate('/library')}>
                View in Library
              </Button>
            </div>
          </Col>

          {/* Game Cover Image */}
          <Col md={5} className="m-2">
            {gameInfo.background_image && (
              <img
                src={gameInfo.background_image}
                alt={gameInfo.name}
                className="w-100 rounded shadow-sm"
                style={{ objectFit: "cover" }}
              />
            )}
          </Col>
        </Row>
      </Container>

      {/* Game Description */}
      <div className="text-center m-5">
        <h3>About</h3>
        <p>{gameInfo.description_raw || "No description available."}</p>
      </div>

      {/* Screenshots Section */}
      <Container>
        <Row className="text-center mt-4">
          <h2>Screenshots</h2>
          {screenshots.length > 0 ? (
            screenshots.map((screenshot) => (
              <Col md={3} sm={6} xs={12} className="my-2" key={screenshot.id}>
                <img
                  src={screenshot.image}
                  alt="screenshot"
                  className="w-100 rounded shadow-sm"
                  style={{ objectFit: "cover" }}
                />
              </Col>
            ))
          ) : (
            <p className="text-muted">No screenshots available.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default GameDetailsPage;
