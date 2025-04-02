import Header from "../components/Header";
import Menu from "../components/Menu";
import Main from "../pages/Main";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
const BaseLayout = () => {
  const isSearching = useSelector(state => state.search.isSearching)
  return (
  
      <Container fluid style={{paddingTop:"80px"}}>
        <Row className="">
          <Col md={2} className={`${isSearching ? "z-n1" : ""} position-fixed`}>
            <Menu />
          </Col>
          <Col md={{span :10,offset : 2} }className="p-5">
            <Main />
          </Col>
        </Row>
      </Container>
  );
};

export default BaseLayout;
