import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, user, logout }) {
  return (
    <div>
      <header className="Header-bar">
        <nav className="nav-bar grid-align-justify">
          <div className="nav-logo-box">
            <Link to="/">
              <h1 className="nav-logo">Pizppy </h1>
            </Link>
          </div>

          <div className="nav-search-bar-div">
            <ion-icon name="pizza" id="nav-search-bar-pizza-logo"></ion-icon>
            <input
              className="nav-search-bar"
              type="search"
              placeholder="Find your favorite pizza 😋"
            />
          </div>

          <div className="nav-btn-div grid-align-justify">
            <a className="nav-btn btn-donate" href="/donate">
              Donate
            </a>
            <a className="nav-btn btn-help" href="/help">
              Help
            </a>
            {isLoggedIn && user ? (
              <>
                <Link to={`/account`}>
                  <div className="nav-user-div">
                    <img
                      className="nav-user-photo"
                      src={`./pizzaImages/coustomers/${user.photo}`}
                      alt={user.name}
                    />
                    <span className="nav-user-name">
                      {user.name ? user.name.split(" ")[0] : "none"}
                    </span>
                  </div>
                </Link>

                <Link to="/" className="nav-btn btn-log-out" onClick={logout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-btn btn-sign-in" to="/signin">
                  Sign In
                </Link>
                <Link className="nav-btn btn-log-in" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
