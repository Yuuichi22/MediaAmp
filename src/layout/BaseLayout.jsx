import Header from "../components/Header";
import Menu from "../components/Menu";
import Main from "../pages/Main";
import { Container, Row, Col } from "react-bootstrap";

const BaseLayout = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <Row className="">
          <Col md={2}  className="bg-black ">
            <Menu />
          </Col>
          <Col md={10}  className="bg-light h-100">
            <Main />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BaseLayout;
