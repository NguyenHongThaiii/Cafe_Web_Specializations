import PropTypes from "prop-types";
import React, { useState } from "react";
import { useController } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

PasswordControl.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  focus: PropTypes.bool,
  setValue: PropTypes.func,
};

function PasswordControl({ control, setValue = null, ...props }) {
  const [show, setShow] = useState(false);
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: "",
  });
  const [valueText, setValueText] = useState(field.value || "");

  const handleOnChange = (e) => {
    setValueText(e.target.value);
    setValue(props.name, e.target.value);
  };
  return (
    <div className="relative">
      {!show ? (
        <BsFillEyeFill
          onClick={() => setShow((prev) => !prev)}
          className="absolute top-0 right-[8px] text-[#c3c3c3] translate-y-[50%] text-[20px] cursor-pointer hover:text-black transition-all duration-150 "
        />
      ) : (
        <BsFillEyeSlashFill
          onClick={() => setShow((prev) => !prev)}
          className="absolute top-0 right-[8px] text-[#c3c3c3] translate-y-[50%] text-[20px] cursor-pointer hover:text-black transition-all duration-150 "
        />
      )}
      {!show ? (
        <input
          className="w-full text-base tracking-[0.4px] outline-none rounded-[4px] border border-[#717171] py-[6px] pl-[10px] pr-[30px] focus:border-[#fc7f9c] focus:shadow-[0_0_6px_rgb(255,123,153)] transition-all duration-300"
          type="password"
          {...field}
          {...props}
          name={props?.name}
        />
      ) : (
        <input
          className="w-full text-base tracking-[0.4px] outline-none rounded-[4px] border border-[#717171] py-[6px] pl-[10px] pr-[30px] focus:border-[#fc7f9c] focus:shadow-[0_0_6px_rgb(255,123,153)] transition-all duration-300"
          type="text"
          onChange={handleOnChange}
          value={field.value || valueText}
        />
      )}
    </div>
  );
}

export default PasswordControl;
