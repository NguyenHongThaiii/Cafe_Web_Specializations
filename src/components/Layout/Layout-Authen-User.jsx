import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

LayoutAuthenUser.propTypes = {};

function LayoutAuthenUser({ children }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  if (!user?.id) {
    // navigate("/");
    // return;
  }
  return <>{children}</>;
}

export default LayoutAuthenUser;
