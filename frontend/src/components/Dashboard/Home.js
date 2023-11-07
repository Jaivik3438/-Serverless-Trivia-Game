import React from "react";
import "../../assets/sass/style.css"
// import { useNavigate } from "react-router-dom";

import Navbar from "./navigation";
/* User Profile Managenent import start */
// import NavButton from "../UserProfileManagement/NavButton";

/* User Profile Management import end */

function Home(){

    // const navigate = useNavigate();

    // const handleClick = () =>{
    //     console.log("clicked");
    //     navigate("/Profile");
    // }

    return (
        <div className="dashboard">
            <Navbar/>
            <div className="title">
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                <h1>
                    This is Home Page
                </h1>
                
            </div>
            <div className="home-container">
                <div className="home-main">
                    {/* <NavButton onClick={handleClick} /> */}
                </div>
            </div>
        </div>
    );
}

export default Home;