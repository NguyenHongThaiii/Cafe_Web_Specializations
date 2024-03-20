import React, { useState } from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

CheckboxCustomControl.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

function CheckboxCustomControl({ onChange = null, ...props }) {
  const [isCheck, setIsCheck] = useState(false);

  const handleOnChange = (e) => {
    if (!onChange) return null;
    const { name, checked } = e.target;
    const res = { [name]: checked };
    setIsCheck(checked);

    onChange(res);
  };

  return (
    <div>
      <label
        htmlFor={props.id}
        className={`block border  cursor-pointer font-normal text-base w-[calc] my-[5px] mx-[3px] py-1 px-2 rounded-full text-center bg-[#f5f5f5] ${
          props.checked
            ? " border-primary bg-[rgba(238,0,51,.08)] text-primary"
            : "border-transparent"
        }`}
      >
        {props.name}
      </label>
      <input
        type="checkbox"
        {...props}
        className="hidden"
        onChange={handleOnChange}
      />
    </div>
  );
}

export default CheckboxCustomControl;
