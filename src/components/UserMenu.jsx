import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const UserMenu = () => {
  const { user, singOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        singOutUser()
          .then(() => {
            navigate("/auth/signin");
            Swal.fire({
              title: "Logout Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: error.message,
            });
          });
      }
    });
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end cursor-pointer">
      <div tabIndex={0} role="button" className="avatar m-1">
        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
          <img src={user?.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-1.5"
      >
        <li className="p-2 font-medium text-secondary">
          User Name: {user?.displayName}
        </li>
        <li>
          <button
            onClick={handleSignOut}
            className="btn btn-sm btn-primary w-full"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
