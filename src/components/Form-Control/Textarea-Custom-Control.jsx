import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

TextareaCustomControl.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  onKeyPress: PropTypes.func,
  isFocus: PropTypes.bool,
  dValue: PropTypes.string,
};
const MIN_TEXTAREA_HEIGHT = 40;

function TextareaCustomControl({
  onChange = null,
  className = "",
  onKeyPress = null,
  isFocus = false,
  dValue = "",
  ...props
}) {
  const [textarea, setTextarea] = useState(dValue);
  const [height, setHeight] = useState("auto");
  const textareaRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    setTextarea(dValue);
  }, [dValue]);
  const handleOnChange = (event) => {
    const value = event.target.value.trim();
    setHeight("auto");
    setTextarea(event.target.value);

    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange({ [props.name]: value });
    }, 0);
  };

  const handleOnKeyPress = async (event) => {
    if (!onKeyPress || (event.key === "Enter" && event.shiftKey)) {
      event.preventDefault();
      return;
    } else if (event.key === "Enter" && textarea) {
      if (!textarea || textarea.trim() === "" || /^[\n]+$/.test(textarea))
        return;
      onKeyPress();
      setTextarea("".trim());
    }
  };
  React.useLayoutEffect(() => {
    setHeight(`${textareaRef?.current?.scrollHeight}px`);
  }, [textarea]);
  return (
    <div className={`mt-4 ${className} `}>
      <textarea
        autoComplete="off"
        ref={textareaRef}
        placeholder="Nhập tối thiểu 10 kí tự."
        value={textarea}
        onKeyPress={onKeyPress ? handleOnKeyPress : null}
        onChange={handleOnChange}
        className={`resize-none overflow-hidden leading-normal w-full text-base border outline-none rounded-[10px] px-2 py-1 ${className}`}
        autoFocus={isFocus}
        {...props}
        style={{
          minHeight: height,
          resize: "none",
        }}
      ></textarea>
    </div>
  );
}

export default TextareaCustomControl;
