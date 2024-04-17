import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

SelectControl.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.number, // Thêm PropTypes cho defaultValue
};

function SelectControl({ control, options = [], defaultValue = 0, ...props }) {
  const { field } = useController({
    defaultValue: "",
    name: props.name,
    control: control,
  });
  return (
    <select
      {...field}
      {...props}
      className={`custom-select ${props?.className}`}
    >
      {!defaultValue && <option value={0}>None</option>}
      {options.map((option, index) =>
        index === 0 ? (
          <option
            value={option.value}
            key={option.id}
            defaultValue={option.value === defaultValue ? option.value : "0"}
          >
            {option.label}
          </option>
        ) : (
          <option
            value={option.value}
            key={option.id}
            defaultValue={option.value === defaultValue ? option.value : "0"}
          >
            {option.label}
          </option>
        )
      )}
    </select>
  );
}

export default SelectControl;
