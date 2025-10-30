import React from 'react'
import '../styles/style.css';
import '../styles/border.css';
import '../styles/swiper.css';
import { Link, useNavigate } from "react-router-dom";
 import CustomScripts from "../UserPages/CustomScripts";
 import  "../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js";
 /* eslint-disable no-unused-expressions */
import { HashLink as Link1 } from 'react-router-hash-link';
/* eslint-disable no-unused-expressions */

import logo_light from '../images/logo-light.png'

const UserNavbar = () => {
  const navigate = useNavigate();
  function myContact() {    
            navigate("/showcontact")
        }
  // const handleQouteClick = () => {
  //           navigate("/showcontact")

  //   };
  const handleLogin =()=>{
    navigate('/login')
  }
  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  const handleDashboard =()=>{
    navigate('/admin')
  }
  return (
   
    <div>
  
      <div className="bg-main">
      <div className="navbar-size py-2 d-none d-lg-flex justify-content-between">
        <div>
          <span className="small-text d-flex gap-2 align-items-center"
            ><i className="fa-solid fa-envelope-open-text"></i
            >info@bustioncharter.com<i className="fa-solid fa-phone ms-3"></i
            >+1-800-555-1234</span
          >
        </div>
        <div>
          <span className="small-text d-flex gap-2 align-items-center"
            ><i className="fa-regular fa-clock"></i>Open hour : Everyday 8 AM-8
            PM</span
          >
        </div>
      </div>
    </div>
    <nav className="navbar bg-white d-flex justify-content-center">
      <div className="navbar-size">
        <div
          className="container-lg d-flex justify-content-between align-items-center px-0"
        >
          <Link className="navbar-brand ms-0 ms-sm-3 ms-lg-0" to="index">
            <img
              src={logo_light}
              alt="Brand Logo"
              width="175"
              height="45"
              className="img-fluid navbar-img"
            />
          </Link>
          <div className="d-flex navbar-text">
            <div className="d-flex d-lg-none">
              <button
                className="navbar-toggler px-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <span className="custom-toggler-icon">
                  <span className="bar bar-1"></span>
                  <span className="bar bar-2"></span>
                  <span className="bar bar-3"></span>
                </span>
              </button>
            </div>
            <div className="d-flex align-items-center me-lg-4">
              <div className="navbar-expand-lg">
                <div
                  className="offcanvas offcanvas-start"
                  tabIndex="-1"
                  id="offcanvasNavbar"
                  data-bs-scroll="true"
                  aria-labelledby="offcanvasNavbar"
                >
                  <div className="offcanvas-header">
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body d-lg-flex justify-content-center">
                    <ul className="navbar-nav gap-3">
                      <li className="nav-item">
                        <Link className="nav-link nav-link1 active" to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        {/* <a className="nav-link nav-link1" href="about.html">About</a> */}
                        <Link1 className="nav-link nav-link1" to="/#about" smooth>About</Link1>
                        {/* <a className="nav-link nav-link1" href="/#about">a</a> */}
                        

                      </li>

                      <li className="nav-item">
                        {/* <a className="nav-link nav-link1" href="/#ourbus">Our Bus</a> */}
                        <Link1 className="nav-link nav-link1" to="/#ourbus" smooth>Our Bus</Link1>
                       
                      </li>
                      {/* <li className="nav-item dropdown">
                        <button
                          className="nav-link nav-link1 dropdown-toggle d-flex"
                          id="busDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Our Bus
                          <span
                            className="d-flex w-100 justify-content-end ms-lg-2"
                          >
                            <span className="dropdown-toggle-wrapper">
                              <i className="fa-solid fa-caret-down c-main"></i>
                            </span>
                          </span>
                        </button>
                        <ul
                          className="dropdown-menu custom-dropdown-menu"
                          aria-labelledby="busDropdown"
                        >
                          <li>
                            <a
                              className="dropdown-item py-2 px-3"
                              href="our-bus.html"
                              >Our Bus</a
                            >
                          </li>
                          <li>
                            <a
                              className="dropdown-item py-2 px-3"
                              href="bus-detail.html"
                              >Bus Detail</a
                            >
                          </li>
                        </ul>
                      </li> */}
                       <li className="nav-item dropdown">
                         {/* <a className="nav-link nav-link1" href="#services">Services</a> */}
                        <Link1 className="nav-link nav-link1" to="/#services" smooth>Services</Link1>
                       
                      </li>
                      {/* <li className="nav-item dropdown">
                        <button
                          className="nav-link nav-link1 dropdown-toggle d-flex"
                          id="servicesDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Services
                          <span
                            className="d-flex w-100 justify-content-end ms-lg-2"
                          >
                            <span className="dropdown-toggle-wrapper">
                              <i className="fa-solid fa-caret-down c-main"></i>
                            </span>
                          </span>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="servicesDropdown"
                        >
                          <li className="pad"></li>
                          <li>
                            <a
                              className="dropdown-item py-2 px-3"
                              href="services.html"
                              >Services</a
                            >
                          </li>
                          <li>
                            <a
                              className="dropdown-item py-2 px-3"
                              href="services-detail.html"
                              >Service Detail</a
                            >
                          </li>
                        </ul>
                      </li> */}
                      <li className="nav-item dropdown">
                        <button
                          className="nav-link nav-link1 dropdown-toggle d-flex"
                          id="pagesDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Pages
                          <span
                            className="d-flex w-100 justify-content-end ms-lg-2"
                          >
                            <span className="dropdown-toggle-wrapper">
                              <i className="fa-solid fa-caret-down c-main"></i>
                            </span>
                          </span>
                        </button>
                        <ul
                          className="dropdown-menu custom-dropdown-menu"
                          aria-labelledby="pagesDropdown"
                        >
                          {/* <li>
                            <a className="dropdown-item py-2 px-3" href="team.html"
                              >Our Team</a
                            >
                          </li> */}
                          <li>
                            {/* <a className="dropdown-item py-2 px-3" href="#whychooseus"
                              >Why Choose Us</a
                            > */}
                            <Link1 className="dropdown-item py-2 px-3" to="/#whychooseus" smooth>Why Choose Us</Link1>
                            
                          </li>
                          <li>
                            {/* <a
                              className="dropdown-item py-2 px-3"
                              href="testimonial.html"
                              >Testimonial</a
                            > */}
                             {/* <a
                              className="dropdown-item py-2 px-3"
                              href="#testimonial"
                              >Testimonial</a
                            > */}
                              <Link1 className="dropdown-item py-2 px-3" to="/#testimonial" smooth>Testimonial</Link1>

                          </li>
                          <li>
                            {/* <a className="dropdown-item py-2 px-3" href="faqs.html"
                              >FAQs</a
                            > */}                           
                            {/* <a className="dropdown-item py-2 px-3" href="#faqs"
                              >FAQs</a
                            > */}
                              <Link1 className="dropdown-item py-2 px-3" to="/#faqs" smooth>FAQs</Link1>
                            
                          </li>
                          {/* <li>
                            <a
                              className="dropdown-item py-2 px-3"
                              href="career.html"
                              >Career</a
                            >
                          </li> */}
                          <li>
                            {/* <a
                              className="dropdown-item py-2 px-3"
                              href="#topdestination"
                              >Top Destination</a
                            > */}
                            <Link1 className="dropdown-item py-2 px-3" to="/#topdestination" smooth>Top Destination</Link1>

                          </li>
                          {/* <li>
                            <a
                              className="dropdown-item py-2 px-3"
                              href="404-page.html"
                              >404 Page</a
                            >
                          </li> */}
                          <li>
                            {/* <a className="dropdown-item py-2 px-3" href="blog.html"
                              >Blog Post</a
                            > */}
                            {/* <a className="dropdown-item py-2 px-3" href="#blogpost"
                              >Blog Post</a
                            > */}
                            <Link1 className="dropdown-item py-2 px-3" to="/#blogpost" smooth>Blog Post</Link1>
                            
                          </li>
                          {/* <li>
                            <a
                              className="dropdown-item py-2 px-3"
                              href="single-post.html"
                              >Single Post</a
                            >
                          </li> */}
                        </ul>
                      </li>
                      <li className="nav-item">
                        {/* <a className="nav-link nav-link1" onclick="myContact">Contact</a> */}
                        <Link className="nav-link nav-link1" to="/showcontact"> Contact</Link>
                        
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-none d-lg-block">
              {/* <button className="btn-subtle" onClick={handleQouteClick}>Get Your Quote</button> */}
              
              {!localStorage.getItem('token')?
                <button className="btn-subtle" onClick={handleLogin}>Login</button>
                :localStorage.getItem('utype')=="user"?<button onClick={handleLogout} className='btn-subtle'>Logout</button>
                :<button onClick={handleDashboard} className='btn-subtle'>Dashboard</button>}
            </div>
          </div>
        </div>
        <div id="alert-container"></div>
      </div>
    </nav>
    </div>
  )
}

export default UserNavbar
