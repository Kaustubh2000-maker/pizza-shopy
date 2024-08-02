import React from "react";

function footer() {
  return (
    <footer className="footer">
      <div className="footer-container grid-5-col">
        <div className="logo-col">
          <a href="/" className="footer-logo-a">
            <h1>Pizppy</h1>
            {/* <img
              src="./../pizza images/pizza-Logo.png"
              alt="rotating logo"
              className="logo-rotate"
            /> */}
          </a>
          <ul className="social-links">
            <li>
              <a className="footer-link" href="/">
                <ion-icon id="social-icon" name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                <ion-icon id="social-icon" name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                <ion-icon id="social-icon" name="logo-twitter"></ion-icon>
              </a>
            </li>
          </ul>
          <p className="copyright">
            copyright &copy;: 2027 by Pizppy all rights reserved
          </p>
        </div>

        <div className="address-colums">
          <p className="footer-heading">Contact us</p>
          <address className="contacts">
            <p className="address">
              Address: shop.no:11, Panchavti Karanja , Nashik-422006
            </p>

            <p>
              <a className="footer-link" href="tel:415-201-6370">
                415-201-6370
              </a>
            </p>

            <p>
              <a className="footer-link" href="mailto:hello@Pizppy.com">
                hello@Pizppy.com
              </a>
            </p>
          </address>
        </div>

        <nav className="nav-col">
          <p className="footer-heading">Company</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="/">
                About Pizppy
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                For Business
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Cooking partners
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                Careers
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Account</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="/">
                {" "}
                Create account
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                {" "}
                sign in
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                {" "}
                ios app
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                {" "}
                Android app
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Resources</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="/">
                {" "}
                Recipe directory{" "}
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                {" "}
                Help center{" "}
              </a>
            </li>
            <li>
              <a className="footer-link" href="/">
                {" "}
                Privacy & terms
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default footer;
