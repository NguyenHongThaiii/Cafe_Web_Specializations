import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import reviewsApi from "../../../api/reviewApi";
Judge.propTypes = {
  item: PropTypes.object,
  filterReview: PropTypes.object,
  onShow: PropTypes.func,
};

function Judge({ item = {}, onShow = null, filterReview = {} }) {
  const [state, setState] = useState([]);
  const [judges, setJudges] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const data = await reviewsApi.getAll({
          ...filterReview,
          productId: item.id,
          page: 0,
        });
        const judge = {};
        data?.forEach((review, index) => {
          judge["food"] = judge["food"]
            ? judge["food"] + review?.rating?.food
            : review?.rating?.food;
          judge["service"] = judge["service"]
            ? judge["service"] + review?.rating?.service
            : review?.rating?.service;
          judge["price"] = judge["price"]
            ? judge["price"] + review?.rating?.price
            : review?.rating?.price;
          judge["space"] = judge["space"]
            ? judge["space"] + review?.rating?.space
            : review?.rating?.space;
          judge["location"] = judge["location"]
            ? judge["location"] + review?.rating?.location
            : review?.rating?.location;
        });
        setState(data);
        setJudges(() => {
          return {
            food: judge["food"] / data?.length,
            price: judge["price"] / data?.length,
            service: judge["service"] / data?.length,
            location: judge["location"] / data?.length,
            space: judge["space"] / data?.length,
          };
        });
      } catch (error) {
        console.log("Error", error);
      }
    })();
  }, [item, filterReview]);
  return (
    <div className="pt-1 px-[14px] pb-[10px] mb-[6px] shadow-[0_1px_4px_rgb(0,0,0,0.3)] rounded-[10px] flex-1">
      <h2 className="text-[21px] font-semibold">Đánh giá</h2>
      <div className="flex items-center justify-center mb-2">
        {state.length > 0 ? (
          <div className="text-[28px] bg-primary text-center text-white rounded-[10px] py-1 px-2 min-w-[50px] mr-1 font-bold">
            {item?.avgRating?.toFixed(1)}
          </div>
        ) : (
          <div></div>
        )}

        {/* state.reduce((acc, cur) => acc + cur.rating, 0) / state.length} */}

        <div>
          {item > 0 ? (
            <div></div>
          ) : (
            <div className="text-[21px] font-semibold">
              {state.length > 0 ? "Tuyệt vời" : "Chưa có đánh giá"}
            </div>
          )}
          <div
            className={`{${state.length > 0 ? "text-left" : "text-center"}}`}
          >
            {state.length > 0 && " / 5"} ({state.length} đánh giá)
          </div>
        </div>
      </div>

      <div className={`${state.length === 0 ? "hidden" : "block"}`}>
        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Vị trí</p>

          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb]  ">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.location} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">
            {parseFloat(judges.location).toFixed(1)}
          </span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Không gian</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb] ">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.space} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">
            {parseFloat(judges.space).toFixed(1)}
          </span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Đồ uống</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb] ">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.food} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">
            {parseFloat(judges.food).toFixed(1)}
          </span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Phục vụ</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb] ">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.service} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">
            {parseFloat(judges.service).toFixed(1)}
          </span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Giá cả</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb] ">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.price} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">
            {parseFloat(judges.price).toFixed(1)}
          </span>
        </div>
      </div>

      <div className={`relative ${state.length > 0 ? "hidden" : "block"}`}>
        <div className="absolute inset-0 bg-[hsla(0,0%,100%,0.65)] flex items-center justify-center">
          <button
            onClick={onShow}
            className="text-primary min-h-[50px] animate-shake transition-all duration-150 hover:animate-none hover:bg-[#be0129] hover:border-[#be0129] hover:text-white bg-transparent cursor-pointer font-bold  border-4 border-primary text-sm py-[10px] px-4 rounded-[10px] "
          >
            Đánh giá ngay
          </button>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Vị trí</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb] ">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#ebebeb]"
              }`}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">0</span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Không gian</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb] ">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#ebebeb]"
              }`}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">0</span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Đồ uống</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb] ">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#ebebeb]"
              }`}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">0</span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Phục vụ</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb]">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#ebebeb]"
              }`}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">0</span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Giá cả</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden bg-[#ebebeb]">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#ebebeb]"
              }`}
            ></span>
          </div>
          <span className="basis-[10%] font-bold">0</span>
        </div>
      </div>
    </div>
  );
}

export default Judge;
