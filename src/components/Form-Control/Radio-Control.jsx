import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

RadioControl.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

function RadioControl({ onChange = null, ...props }) {
  const handleOnChange = (e) => {
    if (!onChange) return null;
    const { name, value } = e.target;
    const res = { [name]: value };
    onChange(res);
  };
  return (
    <div className={`flex items-center`}>
      <input
        type="radio"
        className="h-5 w-5 cursor-pointer checked:bg-primary accent-primary rounded-full"
        {...props}
        onChange={handleOnChange}
      />
      <label
        htmlFor={props.id}
        className="text-sm  text-black px-2 block cursor-pointer"
      >
        {props.label}
      </label>
    </div>
  );
}

export default RadioControl;
