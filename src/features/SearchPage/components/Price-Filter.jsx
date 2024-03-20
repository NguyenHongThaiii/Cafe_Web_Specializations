import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import { useForm } from "react-hook-form";
import RangeInputControl from "../../../components/Form-Control/Range-Input-Control";
import { ResetContext } from "../pages/Search-Page";

PriceFilter.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

function PriceFilter({ title = "", data = [], name = "", onChange = null }) {
  const [show, setShow] = useState(true);
  const { control, handleSubmit, reset } = useForm({});

  const [isReset, setIsReset] = useContext(ResetContext);

  useEffect(() => {
    if (isReset) {
      reset();
      setIsReset(false);
    }
  }, [isReset]);

  const handleOnChange = (value, event) => {
    if (!onChange) return null;
    onChange(res);
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
          onInput={debounce(handleSubmit(handleOnChange), 300)}
          className={`scroll-bar ${
            data.length > 0 &&
            "p-[10px] flex overflow-y-auto flex-col gap-y-[10px] max-h-[242px] "
          }`}
        >
          <RangeInputControl
            control={control}
            min={0}
            max={1000000}
            name={name}
            id="price-range"
          />
        </form>
      </UnmountClosed>
    </>
  );
}

export default PriceFilter;
