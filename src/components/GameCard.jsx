import { Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const GameCard = ({id,name,background_image,genres}) => {
    const navigate = useNavigate()
    return (
        <Col className="p-2" md={4} onClick={() => navigate(`games/${id}`)}>
           <div className="w-100">
            <img src={background_image} alt="" className="w-100"/>
        </div>
        <div>
            <div>{name}</div>
            <div className="d-flex gap-2">{genres.map((genre) => <div className="rounded-pill ">{genre.name}</div>)}</div>
        </div>
        </Col>
     
     
    )

}

export default GameCard