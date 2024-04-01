import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import blogsApi from "../../../api/blogsApi";
NearAreaItem.propTypes = {
  item: PropTypes.object,
};

function NearAreaItem({ item }) {
  const [state, setState] = useState(0);
  const navigate = useNavigate();
  const filters = {
    slugArea: `${item?.slug}`,
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await blogsApi.getAll(filters);
        setState(data?.length ? data.length : 0);
      } catch (error) {
        console.log("Error 💥", error.message);
      }
    })();
  }, []);
  const handleClick = () => {
    navigate(`/search?areas=${item?.slug}`);
  };
  return (
    <div
      onClick={handleClick}
      className="relative  rounded-[10px] overflow-hidden w-full hover-scale h-[200px] md:h-[300px] lg:h-[330px]  lg:max-w-[273px]"
    >
      <img
        src={item?.image?.url}
        alt={item?.name}
        className="w-full h-full object-cover rounded-[10px] transition-all duration-1000"
      />
      <div className="absolute inset-0 flex justify-end text-white flex-col px-[20px] py-[16px] cursor-pointer bg-near-gradient-webkit">
        <h4 className="text-[24px] text-white font-bold ">{item?.name}</h4>
        <p className="text-[14px] font-normal ">{state} quán cafe</p>
      </div>
    </div>
  );
}

export default NearAreaItem;
