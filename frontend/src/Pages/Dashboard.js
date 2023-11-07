import { useEffect } from "react";
import CommonNavbar from "../components/CommonNavbar";
import { useNavigate } from "react-router-dom";
import "../components/LogoutPage.css";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const queryParameters = new URLSearchParams(
      window.location.hash.substring(1)
    );
    const idTokenParam = queryParameters.get("id_token");
    const accessTokenParam = queryParameters.get("access_token");
    const verified = localStorage.getItem("verified");
    if (idTokenParam && accessTokenParam) {
      localStorage.setItem("token", accessTokenParam);
      localStorage.setItem("idToken", idTokenParam);
    }
    const token = localStorage.getItem("token");
    const idToken = localStorage.getItem("idToken");
    if (token && idToken && verified !== "true") {
      navigate("/verify");
    }
  }, []);

  return (
    <>
      <CommonNavbar />
      <div className="logout-page">
        <CommonNavbar />
        <h1>Welcome To Trivia.com</h1>
        {/* <p>Click the button below to logout.</p> */}
        {/* <button className="logout-button">Logout</button> */}
      </div>
    </>
  );
}

export default Dashboard;
