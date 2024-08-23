import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="d-grid gap-2">
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          navigate("/registration");
        }}
      >
        Registrasi
      </Button>
    </div>
  );
};

export default Main;
