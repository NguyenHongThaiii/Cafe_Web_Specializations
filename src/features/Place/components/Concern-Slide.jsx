import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProminentPlaceItem from "../../Home/components/Prominent-Place-Item";
import { handleInnerHeightArea } from "../../../utils";

ConcernSlide.propTypes = {
  data: PropTypes.array,
};

function ConcernSlide({ data = [] }) {
  const [numberSlides, setNumberSlides] = useState(null);

  useEffect(() => {
    (async () => {
      window.addEventListener("resize", handleResize);
      handleResize();
    })();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleResize = () => {
    setNumberSlides(handleInnerHeightArea(window.innerWidth));
  };

  return (
    <>
      <div className="lg:grid hidden grid-cols-4 gap-x-3  flex-nowrap overflow-hidden  py-1 ">
        {data.map((item) => (
          <div className="flex-1 " key={item._id}>
            <ProminentPlaceItem item={item} />
          </div>
        ))}
      </div>
      <div className="md:grid grid-cols-2 lg:hidden gap-x-3   flex-nowrap overflow-hidden  py-1 ">
        {data.slice(0, 2).map((item) => (
          <div className="flex-1 " key={item._id}>
            <ProminentPlaceItem item={item} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ConcernSlide;
