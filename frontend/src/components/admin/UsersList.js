import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { useAlert } from "react-alert";
import { allUsers, clearErrors, deleteUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User Deleted Successfully");
      dispatch({ type: DELETE_USER_RESET });
      navigate("/admin/users");
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link
                to={`/admin/user/${user._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteUserHandler(user._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <MetaData title={"All Users"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <h1 className="m-4">All Users</h1>
            {loading ? (
              <Loader />
            ) : (
              <>
                <MDBDataTable
                  data={setUsers()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default UsersList;
