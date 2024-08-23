import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Api from "../api/Api";
import Topbar from "../components/molecules/Topbar";

const Root = () => {
  const token = localStorage.getItem("token_jms");

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     Api.get("/auth/profile", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //       .then((res) =>
  //         localStorage.setItem("profile_jms", JSON.stringify(res.data))
  //       )
  //       .catch((err) => {
  //         if (err.response.data.message === "Unauthorized") {
  //           localStorage.removeItem("token_jms");
  //           localStorage.removeItem("profile_jms");
  //           Swal.fire({
  //             title: "Error",
  //             text: "Silahkan masuk terlebih dahulu",
  //             icon: "error",
  //             confirmButtonText: "Tutup",
  //           }).then(() => {
  //             navigate("/login", { replace: true });
  //           });
  //         } else {
  //           localStorage.removeItem("token_jms");
  //           localStorage.removeItem("profile_jms");
  //           Swal.fire({
  //             title: "Error",
  //             text: "Silahkan masuk terlebih dahulu",
  //             icon: "error",
  //             confirmButtonText: "Tutup",
  //           }).then(() => {
  //             navigate("/login", { replace: true });
  //             console.error(err);
  //           });
  //         }
  //       });
  //   } else {
  //     Swal.fire({
  //       title: "Error",
  //       text: "Silahkan masuk terlebih dahulu",
  //       icon: "error",
  //       confirmButtonText: "Tutup",
  //     }).then(() => {
  //       navigate("/login", { replace: true });
  //     });
  //   }
  // }, [token]);

  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
};

export default Root;
