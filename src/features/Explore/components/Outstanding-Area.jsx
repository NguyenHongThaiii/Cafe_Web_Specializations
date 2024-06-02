import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import blogsApi from "../../../api/blogsApi";
import { useNavigate } from "react-router-dom";

OutstandingArea.propTypes = {};

function OutstandingArea(props) {
  const [state, setState] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const blogs = await blogsApi.getAll({ outstanding: 1, status: 1 });
      setState(blogs);
    })();
  }, []);
  const item = {};
  const handlePlacePace = (value) => {
    navigate(`/place/${value.slug}`);
  };
  return (
    <div className="px-3 py-4 rounded-xl bg-white ">
      <div>
        <h3 className="text-[20px] text-center font-semibold border-b-2 border-b-[#eee]">
          Địa điểm nổi bật
        </h3>
        {state?.map((item) => (
          <div key={item?.id}>
            <div
              onClick={() => handlePlacePace(item)}
              className="px-[6px] py-[10px] flex relative hover:bg-[#eee] cursor-pointer transition-all duration-300"
            >
              <img
                src={item?.listImage?.length > 0 && item?.listImage[0]?.url}
                alt=""
                className="mr-[10px] w-[50px] h-[50px] object-cover rounded-[4px]"
              />
              <div className="pr-3 mr-[10px] flex-1">
                <p className="text-base text-black font-semibold mb-[2px]">
                  {item?.name}
                </p>
                <p className="text-sm text-[#6b6b6b] truncate-text">
                  {item?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OutstandingArea;
