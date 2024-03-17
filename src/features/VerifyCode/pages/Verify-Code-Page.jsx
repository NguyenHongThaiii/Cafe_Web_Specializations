import React, { useState } from "react";
import PropTypes from "prop-types";
import VerificationInput from "react-verification-input";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import usersApi from "../../../api/usersApi";
import queryString from "query-string";
function VerifyCodePage(props) {
  const navigation = useNavigate();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleVerificationChange = (value) => {
    setVerificationCode(value);
  };
  const handleOnVerification = async () => {
    console.log(verificationCode);

    try {
      const email =
        queryString.parse(location.search)?.email || "example@example.com";
      setLoading(true);
      await usersApi.validateRegistration({
        email,
        otp: verificationCode,
      });
      setLoading(false);
      navigation("/");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div>
      <VerificationInput onChange={handleVerificationChange} />
      <button onClick={handleOnVerification} disabled={loading}>
        Verify
      </button>
    </div>
  );
}

export default VerifyCodePage;
