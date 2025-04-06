import { Col, Row, Container, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromLibrary } from "../app/features/library/librarySlice";
import { useNavigate } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
const Library = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.library);
  const navigate = useNavigate()
  //console.log(list);
  
  return (
    <Container style={{ paddingTop: "80px" }}>
      <h2 className="text-center mb-4">Your Library</h2>
      <Row className="justify-content-center">
        {list.length === 0 ? (
          <h4 className="text-center text-muted">No games in your library.</h4>
        ) : (
          list.map((game) => (
            <Col md={4} sm={6} xs={12} key={game.id} className="mb-4">
              <div className="">
                <div onClick={() => navigate(`/games/${game.id}`)}>
                  <img src={game.background_image} className="w-100" alt="" />
                </div>
                <div className="text-center" >
                  <h4>{game.name}</h4>
                  <Button variant="danger" onClick={() => dispatch(removeFromLibrary(game))}>Remove From Library</Button>

                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Library;
