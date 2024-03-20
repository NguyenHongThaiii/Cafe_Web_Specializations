import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

RangeInputControl.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
};

function RangeInputControl({ control, ...props }) {
  const { field } = useController({
    defaultValue: 0,
    name: props.name,
    control: control,
  });
  return (
    <div className="pl-2 custom-input ">
      <div className="text-[18px] text-center text-primary font-semibold">
        0 ~{" "}
        <span>
          {new Intl.NumberFormat({
            maximumSignificantDigits: 3,
          }).format(field.value)}
          <span className="ml-1 ">VNĐ</span>
        </span>
      </div>
      <input type="range" {...field} {...props} className="w-full" />
    </div>
  );
}

export default RangeInputControl;
