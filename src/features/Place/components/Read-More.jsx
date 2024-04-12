import React, { useState } from "react";
import PropTypes from "prop-types";

ReadMore.propTypes = {
  range: PropTypes.number,
};

function ReadMore({ range = 280, children }) {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(false);
  };
  return (
    <p className="text whitespace-pre-wrap">
      {isReadMore && text?.length > range ? text.slice(0, range) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide text-primary hover:underline cursor-pointer transition-all"
      >
        {isReadMore && text?.length > range ? "... Xem thêm" : " "}
      </span>
    </p>
  );
}

export default ReadMore;
