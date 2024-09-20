import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import { AuthProvider, AuthContext } from "./Context/AuthContext";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import PizzaDetails from "./components/PizzaDetails";
import Login from "./components/Login";
import Donate from "./components/Donate";
import Signin from "./components/Signin";
import SuccessPage from "./components/SuccessPage";
import Alert from "./components/Alert";
import Account from "./components/Account";
import AdminPizza from "./components/Admin/AdminPizza";

import MyOrders from "./components/MyOrders";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const {
    fetchUserData,
    isLoggedIn,
    user,
    logout,
    alertMessage,
    setAlertMessage,
  } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, []);
  const [newCartItems, setNewCartItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userCart, setUserCart] = useState([]);

  return (
    <DataProvider>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} user={user} logout={logout} />
        {alertMessage && (
          <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
        )}{" "}
        {/* Render Alert */}
        <Routes>
          <Route exact path="/" element={<Main user={user} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/account" element={<Account user={user} />} />
          <Route exact path="/donate" element={<Donate />} />
          <Route
            exact
            path="/success"
            element={
              <SuccessPage
                user={user}
                setNewCartItems={setNewCartItems}
                setCartItems={setCartItems}
                setUserCart={setUserCart}
              />
            }
          />
          <Route exact path="/myOrders" element={<MyOrders user={user} />} />
          <Route exact path="/pizza" element={<AdminPizza />} />
          <Route exact path="/pizza" element={<AdminPizza />} />
          <Route path="/:slug" element={<PizzaDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
