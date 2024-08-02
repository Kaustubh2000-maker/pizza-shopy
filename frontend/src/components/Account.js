import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Account = () => {
  const { user, logout, fetchUserData, loading, showAlert } =
    useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="error">Error loading user data. Please try again.</div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/users/updateMe/${user._id}`,
        {
          name,
          email,
        }
      );
      if (response.data.status === "success") {
        fetchUserData();
        console.log("User data updated successfully");
        showAlert("User data updated successfully");
      }
    } catch (err) {
      console.error("Error updating user data", err);
      showAlert("Error updating user data");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/users/updatePassword/${user._id}`,
        {
          passwordCurrnet: currentPassword,
          password: newPassword,
          passwordConfirm: confirmPassword,
        }
      );
      if (response.data.status === "success") {
        console.log("Password updated successfully");
        // Clear the input fields by resetting the state
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        showAlert("Password Updated !");
      }
    } catch (err) {
      console.error("Error updating password", err);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showAlert("Either old or new password is wrong");
    }
  };

  return (
    <div className="account-page">
      <div className="account-page-box">
        <div className="account-options">
          <div className="account-options-box">
            <h1 className="account-options-headings">User</h1>
            <div className="account-options-links">
              <Link to="/account" className="account-link">
                <ion-icon
                  id="account-nav-icon"
                  name="settings-outline"
                ></ion-icon>
                <span>Settings</span>
              </Link>
              <Link to="/myOrders" className="account-link">
                <ion-icon id="account-nav-icon" name="bag-outline"></ion-icon>
                <span>Orders</span>
              </Link>
              <Link to="/coupons" className="account-link">
                <ion-icon
                  id="account-nav-icon"
                  name="ticket-outline"
                ></ion-icon>
                <span>Coupons</span>
              </Link>
              <Link to="/" onClick={logout} className="account-link">
                <ion-icon
                  id="account-nav-icon"
                  name="log-out-outline"
                ></ion-icon>
                <span>Log out</span>
              </Link>
            </div>
            {user.role === "admin" && (
              <>
                <h1 className="account-options-headings">Admin</h1>
                <div className="account-options-links">
                  <Link to="/pizza" className="account-link">
                    <ion-icon
                      id="account-nav-icon"
                      name="pizza-outline"
                    ></ion-icon>
                    <span>Pizza</span>
                  </Link>
                  <Link to="/users-access" className="account-link">
                    <ion-icon
                      id="account-nav-icon"
                      name="people-outline"
                    ></ion-icon>
                    <span>Users Access</span>
                  </Link>
                  <Link to="/offers" className="account-link">
                    <ion-icon
                      id="account-nav-icon"
                      name="flash-outline"
                    ></ion-icon>
                    <span>Offers</span>
                  </Link>
                  <Link to="/all-orders" className="account-link">
                    <ion-icon
                      id="account-nav-icon"
                      name="wallet-outline"
                    ></ion-icon>
                    <span>All Orders</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="account-header">
            <h1 className="account-header-heading">Your account settings</h1>
            <div className="account-user-photo-name">
              <img
                src={`./pizzaImages/coustomers/${user.photo}`}
                alt="User"
                className="account-user-photo"
              />
              <h1 className="account-user-name">{user.name}</h1>
            </div>
            <div className="account-user-data">
              <form className="account-header-form" onSubmit={handleUpdate}>
                <div>
                  <label className="account-header-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="account-header-field"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="account-header-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="account-header-field"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button className="account-header-btn-submit" type="submit">
                  Submit
                </button>
              </form>
            </div>

            <div className="account-user-password">
              <form
                className="account-header-form"
                onSubmit={handlePasswordUpdate}
              >
                <h1 className="account-header-heading">Change password</h1>
                <div>
                  <label
                    className="account-header-label"
                    htmlFor="current-password"
                  >
                    Password
                  </label>
                  <input
                    className="account-header-field"
                    type="password"
                    id="current-password"
                    value={currentPassword} // Bind the value to state
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="account-header-label"
                    htmlFor="new-password"
                  >
                    New Password
                  </label>
                  <input
                    className="account-header-field"
                    type="password"
                    id="new-password"
                    value={newPassword} // Bind the value to state
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="account-header-label"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="account-header-field"
                    type="password"
                    id="confirm-password"
                    value={confirmPassword} // Bind the value to state
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button className="account-header-btn-submit" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
