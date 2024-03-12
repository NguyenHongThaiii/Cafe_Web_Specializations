import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import blogsApi from "../../../api/blogsApi";
import ProminentPlaceItem from "./Prominent-Place-Item";

ProminentPlace.propTypes = {
  limit: PropTypes.number,
  data: PropTypes.array,
};

function ProminentPlace({ data = [], limit = 5 }) {
  const [state, setState] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await blogsApi.getAll({
          limit: limit,
          outstanding: 1,
        });
        setState(data);
        console.log(data);
      } catch (error) {
        console.log("Error 💥", error.message);
      }
    })();
  }, []);
  return (
    <section className="pb-9">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2
          className="text-left pl-[4px] border-l-4 border-primary font-bold text-[18px] text-text relative
          mt-[14px] mb-[10px] lg:my-10 lg:text-[28px] lg:text-center before:hidden before:lg:block lg:border-none
        before:absolute before:w-[90px] before:h-[2.5px] before:bg-primary before:mx-auto 
        before:top-auto  before:right-0 before:left-0 before:bottom-[-10px] before:rounded-[10px]
        
        "
        >
          Địa điểm nổi bật
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {state.map((item) => (
            <ProminentPlaceItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProminentPlace;
