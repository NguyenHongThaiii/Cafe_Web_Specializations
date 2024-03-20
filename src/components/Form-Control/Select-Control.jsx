import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

SelectControl.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array,
};

function SelectControl({ control, options = [], ...props }) {
  const { field } = useController({
    defaultValue: "",
    name: props.name,
    control: control,
  });
  return (
    <div className="">
      <select {...field} {...props} className="custom-select">
        {options.map((option) => (
          <option value={option.value} key={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectControl;
