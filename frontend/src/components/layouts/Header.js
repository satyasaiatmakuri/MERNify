import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logOutHandler = () => {
    dispatch(logout());
    alert.success("Logged Out Successfully.");
  };

  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3 text-center">
          <div className="navbar-brand">
            <Link to={"/"}>
              {/* <img src={"/images/shopit_logo.png"} alt="MERN" /> */}
              <div className="logoBrand">MERNify</div>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-5 px-4 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="me-2">
              Cart
            </span>
            <span className="me-3" id="cart_count">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="mx-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" ? (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                ) : null}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logOutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
