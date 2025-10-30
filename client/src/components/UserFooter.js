import React from 'react'
import logo_dark from '../images/logo-dark.png'
const UserFooter = () => {
  return (
    <div>
      <div className="bg-heading">
      <div className="page-size">
        <div className="container-lg px-0">
          <div className="row mt-5">
            <div className="col-12 col-lg-5">
              <img src={logo_dark} alt="logo" className="footer-logo" />
              <p className="c-text-2 mt-4 me-5">
                Helping brands shine with tailored digital marketing strategies
                focused on engagement
              </p>
              <div className="d-flex gap-3 mt-4">
                <div className="d-flex gap-2 py-2">
                  <a href="https://www.facebook.com/" className="footer-icon">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://www.twitter.com/" className="footer-icon">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="https://linkedin.com/" className="footer-icon">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://www.youtube.com/" className="footer-icon">
                    <i className="fa-brands fa-youtube"></i
                  ></a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-2 mt-4 mt-lg-0">
              <h5 className="fw-bolder c-white">Explore</h5>
              <ul className="footer-links">
                <li>
                  <a className="footer-link" href="index-2.html">Home</a>
                </li>
                <li>
                  <a className="footer-link" href="about.html">About</a>
                </li>
                <li>
                  <a className="footer-link" href="our-bus.html">Our Busses</a>
                </li>
                <li>
                  <a className="footer-link" href="pricing.html">Pricing</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-2 mt-4 mt-lg-0">
              <h5 className="c-white fw-bolder">Navigation</h5>
              <ul className="footer-links">
                <li>
                  <a className="footer-link" href="index-2.html"
                    >Documentation</a
                  >
                </li>
                <li>
                  <a className="footer-link" href="index-2.html">Cookies</a>
                </li>
                <li>
                  <a className="footer-link" href="faqs.html">FAQs</a>
                </li>
                <li>
                  <a className="footer-link" href="index-2.html">Disclaimer</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-3 order-4 order-lg-0 mt-5 mt-lg-0">
              <h5 className="c-white mb-4 fw-bolder">Newsletter</h5>
              <form action="#" method="post" id="newsletterForm" className="pt-2">
                <div className="popup-message" id="popupMessage">
                  <div>
                    <i className="fa-solid fa-check fa-2xl"></i>
                  </div>
                  Thank you! The form submitted successfully
                </div>
                <input
                  type="email"
                  className="footer-input"
                  placeholder="Insert your email for newsletter"
                />
                <button type="submit" className="footer-btn mt-4">
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserFooter
