import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Pagination } from "react-bootstrap";
import GameCard from "./GameCard";
import { LoaderCircle } from "lucide-react";
const Main = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = Number(page) || 1; // Ensure `page` is a number
  const [pages, setPages] = useState([]);
  const [jumpPage, setJumpPage] = useState(""); // State for input field

  useEffect(() => {
    const newPages = [];
    for (let i = Math.max(1, currentPage - 2); i <= currentPage + 2; i++) {
      newPages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => navigate(`/${i}`)}
        >
          {i}
        </Pagination.Item>
      );
    }
    setPages(newPages);
  }, [currentPage, navigate]);

  const { list, error, isLoading } = useSelector((state) => state.games);

  const handleJump = (e) => {
    e.preventDefault();
    const pageNum = Number(jumpPage);
    if (!isNaN(pageNum) && pageNum > 0) {
      navigate(`/${pageNum}`);
      setJumpPage(""); // Clear input after navigation
    }
  };

  return isLoading ? (
    
    <div>
      <div style={{width:"max-content",margin:"auto"}}>
      <LoaderCircle className="rotating " />
      </div>
  </div>
  
  
  ) : (
    <Container>
      <Row>
        {list.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </Row>
      <Row className="d-flex  justify-content-center mt-5 ">
        <Col md={4}>
        <Pagination>{pages}</Pagination>
        </Col>
        <Col md={4}>
        <form onSubmit={handleJump} className="d-flex gap-2">
          <input
            type="number"
            placeholder="Jump to"
            className="form-control"
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            min="1"
            style={{ width: "100px" }}
          />
          <button type="submit" className="btn btn-primary">
            Go
          </button>
        </form></Col>
       
      </Row>
    </Container>
  );
};

export default Main;
