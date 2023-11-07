import React from "react";
import "../../assets/sass/style.css"

function NavButton({onClick}){
     return(
        <button className="button-classic" onClick={onClick}>
            Profile Management
        </button>
     );
}

export default NavButton;