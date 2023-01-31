import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import { AiTwotoneDelete } from "react-icons/ai";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  const removeItemFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <div className="container container-fluid">
        {cartItems.length === 0 ? (
          <h2 className="mt-5">Your Cart is Empty</h2>
        ) : (
          <>
            <MetaData title={"Your Cart"} />
            <h2 className="mt-5">
              Your Cart: <b>{cartItems.length} items</b>
            </h2>

            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                <hr />
                <div className="cart-item">
                  <div className="row">
                    {cartItems.map((item) => (
                      <>
                        <div className="col-6 col-lg-3" key={item.product}>
                          <img
                            src={item.image}
                            alt="Laptop"
                            height="90"
                            width="115"
                          />
                        </div>

                        <div className="col-6 col-lg-3">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2">
                          <p id="card_item_price">{item.price}</p>
                        </div>

                        <div className="col-6 col-lg-3">
                          <div className="stockCounter d-inline">
                            <span
                              className="btn btn-danger minus"
                              onClick={() =>
                                decreaseQty(item.product, item.quantity)
                              }
                            >
                              -
                            </span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              className="btn btn-primary plus"
                              onClick={() =>
                                increaseQty(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                            >
                              +
                            </span>
                          </div>
                        </div>

                        <div className="col-2 col-lg-1">
                          <AiTwotoneDelete
                            className="btn btn-danger"
                            size={40}
                            onClick={() =>
                              removeItemFromCartHandler(item.product)
                            }
                          />
                        </div>
                        <div className="col-12 py-2">
                          <hr />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-3 my-2">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>
                    Subtotal:{" "}
                    <span className="order-summary-values">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (Units)
                    </span>
                  </p>
                  <p>
                    Est. total:{" "}
                    <span className="order-summary-values">
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </p>

                  <hr />
                  <button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
