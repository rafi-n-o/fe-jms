import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Api from "../../api/Api";
import Gap from "../../components/atoms/Gap";
import Loading from "../../components/molecules/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [pin, setPin] = useState("");
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = {
      identifier,
      pin,
    };

    Api.post("/auth/login", form)
      .then((res) => {
        localStorage.setItem("token_jms", res.data.access_token);
        Swal.fire({
          title: "Success",
          text: "Berhasil masuk",
          icon: "success",
          confirmButtonText: "Tutup",
        }).then(() => {
          navigate("/", { replace: true });
        });
      })
      .catch((err) => {
        if (err.response.data.error === "Bad Request") {
          Swal.fire({
            title: "Validation Error",
            icon: "error",
            confirmButtonText: "Tutup",
          }).then(() => {
            setValidation(err.response.data.message);
          });
        } else {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Tutup",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1">
        <Gap size={60} />
        <div className="text-center">
          {/* <h1>Absensi</h1> */}
          {/* <Gap size={10} /> */}
          {/* <Image src="logo.png" width={125} height={125} /> */}
        </div>
        <Gap size={20} />
        <Form onSubmit={submit}>
          <Form.Label htmlFor="inputIdentifier">NIP / No. Telp</Form.Label>
          <Form.Control
            type="text"
            id="inputIdentifier"
            aria-describedby="identifierHelpBlock"
            placeholder="Masukkan NIP / No. Telp..."
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <Form.Text id="identifierHelpBlock" className="text-danger">
            {Array.isArray(validation) &&
              validation.filter((validation) =>
                validation.includes("identifier")
              )[0]}
          </Form.Text>
          <Gap size={10} />
          <Form.Label htmlFor="inputPin">PIN</Form.Label>
          <Form.Control
            type="password"
            id="inputPin"
            aria-describedby="pinHelpBlock"
            placeholder="Masukkan Pin..."
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <Form.Text id="pinHelpBlock" className="text-danger">
            {Array.isArray(validation) &&
              validation.filter((validation) => validation.includes("pin"))[0]}
          </Form.Text>
          <Gap size={20} />
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" size="lg">
              Masuk
            </Button>
          </div>
        </Form>
      </Container>
      <div className="text-center p-4" style={{ marginTop: "auto" }}>
        {/* PT. Sumber Urip Agri Satwa */}
      </div>
    </div>
  );
};

export default Login;
