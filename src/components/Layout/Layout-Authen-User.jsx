import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

LayoutAuthenUser.propTypes = {};

function LayoutAuthenUser({ children }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return <>{children}</>;
}

export default LayoutAuthenUser;
