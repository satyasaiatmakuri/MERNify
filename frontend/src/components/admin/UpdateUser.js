import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import Sidebar from "./Sidebar";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const { user } = useSelector((state) => state.userDetails);

  const { error, isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("user updated succesfully");
      dispatch({
        type: UPDATE_USER_RESET,
      });
      navigate("/admin/users");
    }
  }, [dispatch, alert, error, isUpdated, userId, user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <>
      <MetaData title={`Update User}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="container-container-fluid">
            <div className="row wrapper my-5">
              <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mb-4">Update User</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="name"
                      id="name_field"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="email"
                      id="email_field"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label for="role_field">Role</label>

                    <select
                      id="role_field"
                      className="form-control"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn update-btn btn-block mt-4 mb-3"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
