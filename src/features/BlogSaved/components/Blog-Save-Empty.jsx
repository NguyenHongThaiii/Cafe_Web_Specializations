import React from "react";
import PropTypes from "prop-types";

BlogSaveEmpty.propTypes = {};

function BlogSaveEmpty(props) {
  return (
    <div className="flex items-center justify-center">
      <div>
        <img
          className=" h-[300px] object-cover"
          src="/img/not-found-saved.svg"
          alt="not-found-saved"
        />
        <p className="text-center mt-4 font-bold text-md">
          Không có địa điểm nào
        </p>
      </div>
    </div>
  );
}

export default BlogSaveEmpty;
