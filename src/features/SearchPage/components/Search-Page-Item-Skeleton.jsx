import React from "react";
import PropTypes from "prop-types";

SearchPageItemSkeleton.propTypes = {};

function SearchPageItemSkeleton(props) {
  return (
    <div className="relative hover-scale lg:mb-5 mb-[6px]  bg-white rounded-[10px] shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300">
      <div className="animate-pulse flex space-x-4 p-2">
        <div className=" bg-slate-200 lg:w-[270px] lg:h-[210px]  w-[120px] h-[110px] rounded-md "></div>
        <div className=" flex-1">
          <div className="mt-2 flex flex-col lg:gap-6 gap-3">
            <div className="lg:h-4 h-2 bg-slate-200 rounded"></div>
            <div className="lg:h-4 h-2 bg-slate-200 rounded"></div>
            <div className="lg:h-4 h-2 bg-slate-200 rounded"></div>
            <div className="lg:h-4 h-2 bg-slate-200 rounded"></div>
            <div className="lg:h-4 h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPageItemSkeleton;
