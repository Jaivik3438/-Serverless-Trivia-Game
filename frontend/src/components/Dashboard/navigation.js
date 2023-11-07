import React from 'react';
import { useState,useEffect } from 'react';
import '../../assets/sass/navbar.css'
import logo from '../../assets/images/logo.png'
// import NavButton from '../UserProfileManagement/NavButton';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();


const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-100px";
    }
    setPrevScrollPos(currentScrollPos);
  };

  

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [prevScrollPos]);


const handleClick = () =>{
  console.log("clicked");
  navigate("/Profile");
}

useEffect(() => {
  const handleToggle = () => {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarNav = document.querySelector('.my-navbar-nav');
    navbarToggle.addEventListener('change', () => {
      navbarNav.className = "my-navbar-nav"?"my-navbar-nav":""
    });
  };

  handleToggle();
}, []);


    return (
    <div class="my-navbar" id='navbar'>
        <a class="my-navbar-brand" href="https://www.google.com"><img id="logo" src={logo} width="20px" height="20px" alt="logo"/>  Services</a>
        <input type="checkbox" id="navbar-toggle" class="my-navbar-toggle"hidden/>
        <label for="navbar-toggle" class="navbar-toggle-label">&#9776;</label>
        <nav class="my-navbar-nav">
          {/* <a class="my-nav-link" href="#spl"><NavButton onClick={handleClick} /></a> */}
          <a class="my-nav-link" href="/Profile" onClick={handleClick}>Profile Management</a>
          <a class="my-nav-link" href="#schedule">Schedule</a>
          <a class="my-nav-link" href="#rating">My Rating</a>
          <a class="my-nav-link" href="#logout">Logout</a>
        </nav>
      </div>
    );
  };



export default Navbar;
