import { Container, Row, Col } from "react-bootstrap";

const SystemRequirements = ({ platforms }) => {
  return (
    <>
      {platforms.map(({ platform, requirements }) => {
        if (platform.name !== "PC" || (!requirements?.minimum && !requirements?.recommended)) return null;

        const minimum = requirements.minimum?.split('\n') || [];
        const recommended = requirements.recommended?.split('\n') || [];

        return (
          <Container key={platform.id} className="">
            <Row className="mx-auto">
            <h3 className="fw-bold mb-4">{platform.name} Requirements</h3>

              <Col md={6}  className="mb-3 ">
                {minimum.length > 0 && (
                  <div>
                    <h5 className="text-secondary mb-3">Minimum</h5>
                    {minimum.map((req, idx) => (
                      <div key={`min-${idx}`} className="fw-normal">{req}</div>
                    ))}
                  </div>
                )}
              </Col>
              <Col md={6} >
                {recommended.length > 0 && (
                  <div>
                    <h5 className="text-secondary mb-3">Recommended</h5>
                    {recommended.map((req, idx) => (
                      <div key={`rec-${idx}`} className="fw-normal">{req}</div>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        );
      })}
    </>
  );
};

export default SystemRequirements;
