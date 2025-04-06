import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ margin: 0 ,paddingTop : "80px"}}>
      {/* Fullscreen Hero Section */}
      <section
        className="d-flex align-items-center justify-content-center text-white my-5 p-2"
      
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "2rem",
            borderRadius: "1rem",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          <h1 className="fw-bold mb-3">Explore the World of Games</h1>
          <p className="lead mb-4">
            Dive into top-rated adventures, challenges, and stories. All in one place.
          </p>
          <Button variant="light" size="lg" onClick={() => navigate("/1")}>
            Browse Games
          </Button>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-5 bg-light text-center">
        <Container>
          <h2 className="fw-semibold">Why RAWG?</h2>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: "600px" }}>
            Discover, save, and explore the most loved games from every genre.
            Whether you’re a hardcore gamer or just getting started — RAWG is built for you.
          </p>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container className="text-center">
          <p className="mb-1">© {new Date().getFullYear()} RAWG</p>
          <p className="small">
            Contact: <a href="mailto:support@RAWG.com" className="text-white">support@RAWG.com</a>
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
