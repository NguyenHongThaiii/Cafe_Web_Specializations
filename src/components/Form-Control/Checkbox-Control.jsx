import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

CheckboxControl.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

function CheckboxControl({ onChange = null, ...props }) {
  const handleOnChange = (e) => {
    if (!onChange) return null;
    const { name, checked } = e.target;
    const res = { [name]: checked };
    onChange(res);
  };
  return (
    <div className="flex items-center">
      <input
        className=" w-5 h-5 rounded cursor-pointer accent-primary hover:accent-primary"
        type="checkbox"
        {...props}
        onChange={handleOnChange}
      />
      <label
        className="inline-block ml-2 text-gray-800 cursor-pointer"
        htmlFor={props.id}
      >
        {props.label}
      </label>
    </div>
  );
}

export default CheckboxControl;
