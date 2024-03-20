import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import RadioControl from "../../../components/Form-Control/Radio-Control";
import { useForm } from "react-hook-form";
import { ResetContext } from "../pages/Search-Page";

TimeStartFilter.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string,
  col: PropTypes.bool,
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

function TimeStartFilter({
  type = "checkbox",
  title = "",
  data = [],
  name = "",
  col = false,
  onChange = null,
  filters = {},
}) {
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
          onInput={handleSubmit(handleOnChange)}
          className={`scroll-bar   ${
            data.length > 0 &&
            `p-[10px] flex  overflow-y-auto ${
              col ? "flex-col" : "flex-row"
            }  gap-y-[10px] max-h-[242px] `
          }`}
        >
          {data.map((item, index) => (
            <RadioControl
              key={index}
              control={control}
              label={item}
              name={name}
              id={item}
              value={item}
            />
          ))}
        </form>
      </UnmountClosed>
    </>
  );
}

export default TimeStartFilter;
