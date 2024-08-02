import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "./OrderCard";

const MyOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let user = props.user;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/orders/getAllOrdersByUserId/${user._id}`
        );
        setOrders(response.data.data.orders);
      } catch (err) {
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="order-page">
        <div className="order-container">
          <h1 className="order-container-heading">Your Orders</h1>

          <div className="order-card-column--names">
            <p>Name</p>
            <p>Time</p>
            <p>Order Status</p>
            <p>Payment Status</p>
          </div>
          <div className="order-card-box">
            <h1 className="order-card-box__no-order">
              You haven't tried <br /> our best Pizzas yet !
            </h1>
            <img className="order-card-box__crying" src="./crying.png" alt="" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-container">
        <h1 className="order-container-heading">Your Orders</h1>

        <div className="order-card-column--names">
          <p>Name</p>
          <p>Time</p>
          <p>Order Status</p>
          <p>Payment Status</p>
        </div>
        <div className="order-card-box">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
