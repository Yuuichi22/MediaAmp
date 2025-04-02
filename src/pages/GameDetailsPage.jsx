import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameInfo } from "../service/gamesService";
import { Row, Col, Container, Button } from "react-bootstrap";
import { formatDateToWords } from "../utils/utility";
import { useDispatch } from "react-redux";
import { addToLibrary } from "../app/features/Library/librarySlice";
const GameDetailsPage = () => {
  const dispatch  = useDispatch()
  const [gameInfo, setGameInfo] = useState(null);
  const [screenshots, setScreenShots] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();


// Example Usage

  useEffect(() => {
    // Fetch game details
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

  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!gameInfo) return <div className="text-center">Loading...</div>;

  return (
    <div style={{ paddingTop: "80px", width: "80vw", margin: "auto",backgroundColor : `${gameInfo.dominant_color}`}}>
      <Container >
        <Row className="align-items-center p-5">
          {/* Game Details */}
          <Col md={6}>
            <h1 className="text-wrap" style={{ width: "400px" }}>
              {gameInfo.name}
            </h1>
            <span>Released on {formatDateToWords(gameInfo.released)}</span>
            <div className="buttons d-flex gap-2 mt-5">
              <Button variant="dark" onClick={() => dispatch(addToLibrary(gameInfo))}>Add To Library</Button>
            </div>
        
           
          </Col>

          {/* Game Cover Image */}
          <Col md={6} >
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
      <div className="text-center mt-2">
      <h3>About</h3>
        {gameInfo.description_raw}
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
                  className="w-100 rounded"
                  style={{ objectFit: "cover" }}
                />
              </Col>
            ))
          ) : (
            <p>No screenshots available.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default GameDetailsPage;
