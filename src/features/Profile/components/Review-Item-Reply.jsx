import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { handleCalculateDateFromNow } from "../../../utils";
import ReadMore from "./../../Place/components/Read-More";
ReviewItemReply.propTypes = {
  listReplies: PropTypes.array,
  onClick: PropTypes.func,
};

function ReviewItemReply({ listReplies = [], onClick = null }) {
  const [state, setState] = useState([]);
  console.log(listReplies);
  useEffect(() => {
    (async () => {
      // try {
      //   const temp = listReplies.map((item) => {
      //     return repliesApi.get(item._id);
      //   });
      //   const res = await Promise.all(temp);
      //   const newState = res.map((item) => item.data.data);
      //   setState(newState);
      // } catch (error) {
      //   console.log("Error", error);
      // }
    })();
  }, [listReplies]);

  return (
    <div className="pt-4">
      {listReplies?.map((item, index) => (
        <div key={index} className="pb-[10px] flex  gap-x-[6px]">
          <div className="w-9 h-9  cursor-pointer rounded-full overflow-hidden bg-[#eee]">
            <img
              src={item?.user?.image?.url}
              alt={item?.user?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:max-w-[626px] max-w-[880px]">
            <div className="py-2 px-[15px] rounded-[18px] bg-[#f5f5f7]">
              <div className="flex items-center">
                <Link
                  to={`/profile/${item?.user?.slug}`}
                  className="tracking-[0.4px] mr-[6px] font-semibold text-black hover:underline transition-all"
                >
                  {item?.user?.name}
                </Link>
                <span className="text-xs text-[#898c95]">
                  {handleCalculateDateFromNow(
                    new Date(item?.createdAt).toLocaleDateString("en-US")
                  )}
                </span>
              </div>

              <div className="text-sm">
                <ReadMore range={200}>{item?.name}</ReadMore>
              </div>
            </div>
            {/* <div className="mt-1 px-5 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => onClick(item?.id)}
                  className={`text-xs flex items-center gap-x-1 ${
                    item?.favorite > 0 && "text-primary"
                  }`}
                >
                  {item?.favorite > 0 ? (
                    <>
                      <FaHeart />
                      {item?.favorite} Thích
                    </>
                  ) : (
                    <>
                      <FaRegHeart />
                      Thích
                    </>
                  )}
                </button>
                <div className="text-[#f1f1f1] mx-3 inline-block ">●</div>
                <button className="text-xs flex items-center gap-x-1">
                  Trả lời
                </button>
              </div>

              <div>
                <button className="text-xs flex items-center gap-x-1">
                  <FaEllipsisH />
                </button>
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewItemReply;
