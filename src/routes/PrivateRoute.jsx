import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/auth/signin"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
