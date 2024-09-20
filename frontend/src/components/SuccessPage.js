import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SuccessPage = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // Correctly parsing orderId and userId
  const orderId = queryParams.get("orderId");
  const userId = queryParams.get("userId");

  // Logging parsed values
  console.log("Parsed User ID:", userId);
  console.log("Parsed Order ID:", orderId);

  useEffect(() => {
    const updateOrderAndClearCart = async () => {
      try {
        // Axios request to update the order's payment status
        await axios.patch(`http://127.0.0.1:8000/api/v1/orders/delete-cart`, {
          userId,
        });

        await axios.patch(
          `http://127.0.0.1:8000/api/v1/orders/update-order-status/${orderId}`,
          {
            paymentCompleted: true,
            orderReceived: true,
          }
        );

        // Axios request to clear the cart

        console.log("Order updated and cart cleared successfully");
        // setTimeout(() => {
        //   navigate("/"); // Redirect to home
        // }, 5000); // 5 seconds
      } catch (error) {
        console.error("Error updating order or clearing cart:", error);
      }
    };

    if (orderId && userId) {
      updateOrderAndClearCart();
    }
  }, [orderId, userId]);
  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your order has been placed successfully.</p>
      <Link to="/">home</Link>
    </div>
  );
};

export default SuccessPage;
