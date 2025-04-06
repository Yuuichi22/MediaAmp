import { Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
const GameCard = ({id,name,background_image,genres,released,rating}) => {
    const navigate = useNavigate()
    return (
        <Col className="p-2  hover-selected rounded position-relative" md={4} onClick={() => navigate(`/games/${id}`)}>
           <div className="w-100">
            <img src={background_image} alt="" className="w-100 rounded"/>
        </div>
        <div className="position-absolute end-0 top-0 px-4 py-4 text-white">⭐{rating}</div>
        <div className="">
            <div>{name}</div>
            <div className="d-flex gap-2 my-2">{genres.map((genre) => <div key = {genre.id} className="rounded-pill bg-light px-2 py-1">{genre.name}</div>)}</div>
        </div>
        
        </Col>
    )

}

export default GameCard