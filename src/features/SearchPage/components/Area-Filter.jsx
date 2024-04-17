import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import CheckboxControl from "../../../components/Form-Control/Checkbox-Control";
import CheckboxCustomControl from "../../../components/Form-Control/Checkbox-Custom-Control";
import { FiltersContext } from "../pages/Search-Page";
import RadioControl from "../../../components/Form-Control/Radio-Control";

AreaFilter.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  mobile: PropTypes.bool,
  type: PropTypes.string,
  filters: PropTypes.object,
};

function AreaFilter({
  title = "",
  data = [],
  name = "",
  onChange = null,
  mobile = false,
  type = "radio",
  filters = {},
}) {
  const [show, setShow] = useState(true);
  const handleOnChange = (value, event) => {
    if (!onChange) return null;
    onChange(value);
  };
  return (
    <>
      <Collapse isOpened={true}>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          <h4 className="py-3 pl-2 pr-10 text-[rgba(0,0,0,.85)] font-semibold  grow ">
            {title}
          </h4>
          <i className="fa-solid fa-angle-down "></i>
        </div>
      </Collapse>
      <UnmountClosed isOpened={show}>
        <form
          className={`scroll-bar ${
            data.length > 0 &&
            `${
              !mobile
                ? "p-[10px] flex overflow-y-auto flex-col gap-y-[10px] max-h-[242px] "
                : "p-[10px] grid grid-cols-2 overflow-y-auto gap-y-3 "
            }`
          }`}
        >
          {data.map((item, index) => (
            <RadioControl
              key={index}
              label={item?.name}
              name={"slugArea"}
              id={item?.name}
              value={item?.slug}
              type={type}
              checked={item?.slug === filters?.slugArea}
              onChange={handleOnChange}
            />
          ))}
        </form>
      </UnmountClosed>
    </>
  );
}

export default AreaFilter;
