import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameInfo } from "../service/gamesService";
import {Row,Col,Container} from 'react-bootstrap'
const GameDetailsPage = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getGameInfo(id)
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
        setLoading(false);
      });
  }, [id]);
  console.log(details);
  
 return ( 
    <div style={{ paddingTop: "80px" }}>
          {details && !loading ? 
    <Container fluid>
    <Row className="mt-5">
        <Col md={4}>
        {details.background_image && (
        <img src={details.background_image} alt={details.name} className="w-100" />
      )}</Col>
      <Col>
      <div>
      <h1>{details.name}</h1>
      <div className="d-flex gap-2">
        Genre : 
      {details.genres.map((genre) => <h5>{genre.name}</h5>)}

      </div>
      <p>{details.description_raw}</p>
      </div></Col>
        </Row>
        <Row className="mt-5">
        {details.tags.map((tag) => <Col key={tag.id} md ={2} sm={4} className=" m-auto md:rounded-pill bg-secondary text-center p-2 ">{tag.name}</Col>)}        
        </Row>
    </Container>
  : <div className="text-center">loading....</div>
}
    </div>
  
)
};

export default GameDetailsPage;
