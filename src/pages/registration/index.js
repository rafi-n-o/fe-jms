import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Api from "../../api/Api";
import Loading from "../../components/molecules/Loading";
import Swal from "sweetalert2";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});
  const [hasCamera, setHasCamera] = useState(false);
  const [photo, setPhoto] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let scanner;

  useEffect(() => {
    const setupScanner = async () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        scanner = new QrScanner(
          videoElement,
          (result) => {
            getItem(result.data);
          },
          {
            onDecodeError: (error) => console.error(error),
            maxScansPerSecond: 1,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            returnDetailedScanResult: true,
          }
        );

        try {
          await scanner.start();
        } catch (err) {
          console.error("Error starting scanner: ", err);
        }
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setHasCamera(true);
          setupScanner(); // Start QR Scanner after the camera is set up
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setHasCamera(false);
      }
    };

    startCamera();

    return () => {
      if (scanner) scanner.stop();
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, [item]);

  const getItem = (id) => {
    setLoading(true);
    Api.get(`/mobile-items/${id}`)
      .then((res) => {
        setItem(res.data);
        if (scanner) scanner.stop();
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      console.error("Canvas or context not found");
      return;
    }

    const video = videoRef.current;

    if (!video) {
      console.error("Video element not found");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    setPhoto(canvas.toDataURL("image/png"));
  };

  const btnSave = async () => {
    setLoading(true);

    const form = {
      image: photo,
    };

    Api.put(`/mobile-items/${item.id}/registration`, form)
      .then((res) => {
        Swal.fire({
          title: "Registrasi Berhasil",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Registrasi Gagal",
          text: error.message,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!Object.keys(item).length && (
        <div>
          <h2>Scan QR</h2>
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dotted",
            }}
          ></video>
          {!hasCamera && <p>No camera access</p>}
        </div>
      )}
      {Object.keys(item).length > 0 && (
        <>
          <div>Produk: {item.product?.name}</div>
        </>
      )}
      {Object.keys(item).length > 0 && hasCamera && !photo ? (
        <div>
          <h2>Foto Produk</h2>
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dotted",
            }}
          />
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={capturePhoto}>
              FOTO
            </Button>
          </div>
        </div>
      ) : (
        <p>No camera access</p>
      )}
      {photo && (
        <div>
          <img
            src={photo}
            alt="Captured"
            style={{
              width: "100%",
              height: "100%",
              borderStyle: "dotted",
            }}
          />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Button variant="primary" size="lg" onClick={btnSave}>
        Simpan
      </Button>
    </>
  );
};

export default Registration;
