import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LayoutUser from "../../../components/Layout/Layout-User";
import { useSelector } from "react-redux";
import { FaCoins, FaUserEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdMailOutline, MdPowerSettingsNew } from "react-icons/md";
import ActionUser from "../components/Action-User";
import FormEditUser from "../components/Form-Edit-User";
import LayoutAuthenUser from "../../../components/Layout/Layout-Authen-User";
import usersApi from "../../../api/usersApi";

SettingPage.propTypes = {};

function SettingPage(props) {
  const user = useSelector((state) => state.auth.current);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await usersApi.getBySlug(user?.slug);
        if (!data?.id) navigate("/not-found");
      } catch (error) {
        navigate("/not-found");
      }
    })();
  }, [user]);
  return (
    <LayoutAuthenUser>
      <LayoutUser>
        <div className="max-w-[1200px] mx-auto lg:flex block px-4 gap-5 lg:pb-0 pb-12">
          {/* left */}
          <div className="md:w-[340px] w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,.15)] my-5 p-4 rounded-md">
            <ActionUser />
          </div>
          {/* right */}
          <div className="w-full max-w-[640px] bg-white shadow-[0_2px_8px_rgba(0,0,0,.15)] my-5 px-4 py-2 rounded-md">
            <FormEditUser />
          </div>
        </div>
      </LayoutUser>
    </LayoutAuthenUser>
  );
}

export default SettingPage;
