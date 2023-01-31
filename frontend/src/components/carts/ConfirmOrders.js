import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector } from "react-redux";

const ConfirmOrders = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const itemPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemPrice > 200 ? 0 : 25;

  const taxPrice = Number((0.05 * itemPrice).toFixed(2));

  const totalPrice = (itemPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };
  return (
    <>
      <MetaData title={"Confirm Order"} />
      <CheckOutSteps shipping confirmOrder />
      <div className="container container-fluid">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-3 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user && user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b>{" "}
              {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>

            {cartItems.map((item) => (
              <>
                <hr />
                <div className="cart-item my-1" key={item.product}>
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-8 col-lg-6">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x ${item.price} ={" "}
                        <b>${(item.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">${itemPrice}</span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">${shippingPrice}</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">${taxPrice}</span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrders;
