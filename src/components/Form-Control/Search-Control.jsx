import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

SearchControl.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  focus: PropTypes.bool,
};

function SearchControl({ control, focus, ...props }) {
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: "",
  });
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current && focus) {
      inputRef.current.focus();
    }
  }, [focus]);
  return (
    <div className="px-[12px] bg-[#f0f2f5] flex items-center h-[40px] rounded-[6px] flex-1">
      <i className="fa-solid fa-magnifying-glass w-[18px] h-[18px] text-[20ppx]"></i>
      <input
        className="px-[2px] py-[1px] ml-[6px] mr-[16px] w-full text-base outline-none h-[28px] bg-[transparent] text-[#606770]"
        type="text"
        {...field}
        {...props}
        name={props?.name}
        ref={inputRef}
      />
    </div>
  );
}

export default SearchControl;
