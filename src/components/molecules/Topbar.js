import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Gap from "../atoms/Gap";

const Topbar = () => {
  const navigate = useNavigate();

  const btnLogout = () => {
    localStorage.removeItem("token_jms");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {[false].map((expand, index) => (
        <Navbar expand={expand} className="bg-body-tertiary" key={index}>
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand>
              <a onClick={() => navigate("/attendance-history")}>
                <FontAwesomeIcon icon={faClockRotateLeft} size="lg" />
              </a>
            </Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    onClick={() => {
                      navigate("/");
                      window.location.reload();
                    }}
                  >
                    <div className="d-grid gap-2">
                      <Button variant="primary" size="lg">
                        Absensi
                      </Button>
                    </div>
                  </Nav.Link>
                  <Gap size={5} />
                  <Nav.Link
                    onClick={() => {
                      navigate("/overtime");
                      window.location.reload();
                    }}
                  >
                    <div className="d-grid gap-2">
                      <Button variant="success" size="lg">
                        Lembur
                      </Button>
                    </div>
                  </Nav.Link>
                  <Gap size={5} />
                  <Nav.Link
                    onClick={() => {
                      navigate("/permission");
                      window.location.reload();
                    }}
                  >
                    <div className="d-grid gap-2">
                      <Button variant="warning" size="lg">
                        Izin
                      </Button>
                    </div>
                  </Nav.Link>
                  <Gap size={5} />
                  <Nav.Link
                    onClick={() => {
                      navigate("/profile");
                      window.location.reload();
                    }}
                  >
                    <div className="d-grid gap-2">
                      <Button variant="secondary" size="lg">
                        Profile
                      </Button>
                    </div>
                  </Nav.Link>
                  <Gap size={5} />
                  <Nav.Link>
                    <div className="d-grid gap-2">
                      <Button
                        variant="danger"
                        size="lg"
                        onClick={() => {
                          btnLogout();
                        }}
                      >
                        Keluar
                      </Button>
                    </div>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Topbar;
