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
    <select
      {...field}
      {...props}
      className={`custom-select ${props?.className}`}
    >
      <option value="">None</option>
      {options.map((option, index) =>
        index === 0 ? (
          <option
            value={option.value}
            key={option.id}
            defaultValue={option.value}
          >
            {option.label}
          </option>
        ) : (
          <option value={option.value} key={option.id}>
            {option.label}
          </option>
        )
      )}
    </select>
  );
}

export default SelectControl;
