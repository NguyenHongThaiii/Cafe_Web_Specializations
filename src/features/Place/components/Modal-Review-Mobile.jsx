import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../Auth/authSlice";
import CustomRate from "./Custom-Rate";
import YourJudge from "./Your-Judge";

ModalReviewMobile.propTypes = {
  item: PropTypes.object,
  onShow: PropTypes.func,
  onSubmit: PropTypes.func,
};

function ModalReviewMobile({ item = {}, onShow = null, onSubmit = null }) {
  const user = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [values, setValues] = useState({
    food: 5,
    service: 5,
    space: 5,
    price: 5,
    location: 5,
    review: "",
  });

  if (typeof document === "undefined")
    return <div className="modal">Modal</div>;
  useEffect(() => {
    // do more
  }, []);
  const handleOnChange = (value) => {
    setValues((prev) => ({ ...prev, ...value }));
  };
  const handleClick = async () => {
    try {
      if (values.review.trim().length < 10) return null;
      console.log({ ...values, blogId: item._id, userId: user._id });

      socket.emit("createReview", {
        ...values,
        blogId: item._id,
        userId: user._id,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return createPortal(
    <div className="fixed flex  justify-center inset-0 z-[10000] bg-[rgba(0,0,0,0.65)]">
      <div className="absolute h-full overflow-auto">
        <div className="bg-white lg:w-[610px] sm:w-full">
          <div className="px-10 h-[50px] border-b-[1px] border-b-[rgba(0,0,0,0.1)] flex items-center justify-between">
            <div className="text-[20px] flex items-center justify-center grow font-bold ">
              Đánh giá {item.name}
            </div>
            <div
              onClick={onShow}
              className="w-[30px] h-[30px] rounded-full text-[20px] flex items-center justify-center mr-[-30px] cursor-pointer hover:bg-[#cdcfd4] transition-all bg-[#e4e6eb] text-[#666]"
            >
              <FaTimes />
            </div>
          </div>

          <form className="p-4" ref={formRef}>
            <div className="mb-[10px]">
              <h3 className="text-[18px] text-[#898c95] font-semibold">
                Xếp hạng của bạn
              </h3>

              <CustomRate
                name="location"
                title="Vị trí"
                onChange={handleOnChange}
              />
              <CustomRate
                name="space"
                title="Không gian"
                onChange={handleOnChange}
              />
              <CustomRate
                name="food"
                title="Đồ uống"
                onChange={handleOnChange}
              />
              <CustomRate
                name="service"
                title="Phục vụ"
                onChange={handleOnChange}
              />
              <CustomRate
                name="price"
                title="Giá cả"
                onChange={handleOnChange}
              />
            </div>
            <YourJudge item={item} onChange={handleOnChange} />
          </form>
          <div className="p-[10px] border-t-[1px] border-t-[rgba(0,0,0,.1)] flex items-center justify-end">
            <button
              disabled={values.review.trim().length > 10 ? false : true}
              onClick={handleClick}
              className={`px-[10px] py-[6px]  rounded-[6px] text-base font-medium outline-none
              ${
                values.review.trim().length >= 10
                  ? "bg-primary text-white"
                  : "text-[#bcc0c4] bg-[#e4e6eb]"
              }
              `}
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default ModalReviewMobile;
