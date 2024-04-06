import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { FaEllipsisH, FaHeart, FaReplyAll } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleCalculateDateFromNow } from "../../../utils";
import ModalImage from "./Modal-Image";
import ReadMore from "./Read-More";
import ReplyUser from "./Reply-User";
import commentApis from "../../../api/commentApis";

JudgeUser.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  blog: PropTypes.object,
};

function JudgeUser({ item = {}, onClick = null, onSubmit = null, blog = {} }) {
  const user = useSelector((state) => state.auth.current);
  const [show, setShow] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isShowModalImage, setIsShowModalImage] = useState({
    show: false,
    index: 0,
  });
  const [isReply, setIsReply] = useState(false);
  const [more, setMore] = useState(true);
  const moreRef = useRef(null);

  const handleClickFavor = (reviewId) => {
    if (!onClick) return null;
    onClick(user._id, reviewId);
  };

  const handleShowReply = () => {
    setIsReply(true);
  };

  useEffect(() => {
    handleClick();
    window.addEventListener("resize", handleClick);

    (async () => {
      try {
        const data = await commentApis.getAll({ reviewId: item.id, page: 0 });
        console.log(data);
        setReplies(data);
      } catch (error) {}
    })();

    return () => window.removeEventListener("resize", handleClick);
  }, []);

  const handleClick = () => {
    if (moreRef && moreRef.current && moreRef.current?.offsetHeight > 90) {
      setMore(false);
    } else {
      setMore(true);
    }
  };
  const handleShowModalImage = (index) => {
    setIsShowModalImage((prev) => ({ ...prev, show: true, index }));
  };
  return (
    <>
      <div className="mt-1 pt-4 border-t-[1px] border-t-[#ddd] lg:pt-5 lg:mt-5">
        <div className="py-[5px] px-[10px] bg-[#eee] lg:bg-white  rounded-[12px] ">
          <div className="flex items-center justify-between border-b-[1px] border-b-[#e0e0e0] py-1  ">
            <div className="flex items-center">
              <Link
                to={`/profile/${item?.userDto?.slug}`}
                className="mr-[11px] w-10 h-10 lg:w-[64px] lg:h-[64px]"
              >
                <img
                  src={`${item?.userDto?.image?.url}`}
                  alt={item?.userDto?.name}
                  className="w-full h-full rounded-full"
                />
              </Link>
              <div className="flex flex-col gap-y-1  ">
                <Link
                  to={`/profile/${item?.userDto?.slug}`}
                  className="text-base font-semibold hover:underline cursor-pointer lg:text-[18px]"
                >
                  {item?.userDto?.name}
                </Link>
                <span className="text-xs font-normal text-[#898c95] mb-[2px] block hover:underline cursor-pointer">
                  Đã đánh giá{" "}
                  {handleCalculateDateFromNow(
                    new Date(item?.createdAt).toLocaleDateString("en-US")
                  )}{" "}
                </span>
              </div>
            </div>

            <div className="w-8 h-8 text-xs overflow-hidden text-white bg-primary rounded-full font-bold flex items-center justify-center">
              {parseFloat(item?.rating?.averageRating).toFixed(1)}
            </div>
          </div>

          <div>
            <div
              ref={moreRef}
              className={`relative py-[9px] px-[2px] lg:bg-[#f5f5f7] lg:py-[5px] lg:px-[15px] lg:rounded-br-[10px] lg:rounded-bl-[10px] `}
            >
              <ReadMore range={280}>{item?.name}</ReadMore>
              {item?.listImage?.length > 0 && (
                <div className="flex items-center whitespace-normal mt-[6px] gap-x-2 ">
                  {item?.listImage?.slice(0, 3)?.map((img, index) => (
                    <div
                      onClick={() => handleShowModalImage(index)}
                      className={`rounded-[6px] overflow-hidden relative lg:w-[116px] lg:h-[116px] w-[100px] h-[100px]  ${
                        index < 3 ? "block" : "hidden"
                      }`}
                      key={index}
                    >
                      {index === 2 && item?.listImage?.length > 3 && (
                        <div className="absolute inset-0 bg-[rgba(0,0,0,.4)] transition-all text-white flex items-center justify-center font-semibold cursor-pointer text-base">
                          +{item?.listImage?.length - 2} ảnh
                        </div>
                      )}

                      {(index !== 2 || item?.listImage?.length <= 3) && (
                        <div className="absolute inset-0 cursor-pointer hover:bg-[rgba(0,0,0,.4)] transition-all"></div>
                      )}
                      <img
                        src={`${img?.url}`}
                        alt={`${img}`}
                        className=" w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[8px] px-[10px] flex items-center justify-between">
        <div className="flex items-center text-xs">
          <button
            onClick={() => handleClickFavor(item.id)}
            className={`flex items-center lg:text-sm  ${
              item.favorite > 0 ? "text-primary" : ""
            }`}
          >
            <FaHeart className={`w-3 h-3 mr-1 `} />
            {item.favorite > 0 && (
              <span className="mx-[2px] ">{item?.favorite}</span>
            )}
            Thích
          </button>
          <button
            onClick={() => {
              handleShowReply();
              setShow(true);
            }}
            className="before:content-['●'] before:inline-block lg:text-sm before:text-[#c1c1c1] before:mx-[6px] before:text-[12px] first:before:hidden "
          >
            Trả lời
          </button>
        </div>
        <FaEllipsisH className="relative cursor-pointer" />
      </div>

      {isReply && (
        <ReplyUser
          isReply={isReply}
          review={item}
          onSubmit={onSubmit}
          hideReply={() => setIsReply(false)}
        />
      )}
      {/* Comment */}
      {replies?.length > 0 && show === false && (
        <div
          onClick={() => setShow(true)}
          className="text-black pl-[6px] cursor-pointer text-xs lg:text-sm mt-2 ml-[6px] flex items-center gap-x-2 hover:underline transition-all duration-300"
        >
          <FaReplyAll className="rotate-180" />
          Xem thêm {replies?.length} trả lời
        </div>
      )}

      {replies?.length > 0 &&
        show === true &&
        replies.map((reply, index) => (
          <div
            key={index}
            className="border-l-[1px] border-l-[#eee] ml-[6px] mt-[16px] pl-[10px]"
          >
            <div className="mt-1 pt-4 border-t-[1px] border-t-[#ddd]">
              <div className="py-[5px] px-[10px] bg-[#eee] rounded-[12px] ">
                <div className="flex items-center justify-between border-b-[1px] border-b-[#e0e0e0] py-1 ">
                  <div className="flex items-start">
                    <Link
                      to={`/profile/${reply?.slug}`}
                      className="mr-[11px] w-10 h-10 lg:w-[64px] lg:h-[64px]"
                    >
                      <img
                        src={reply?.user?.image?.url}
                        alt={reply?.user?.name}
                        className="w-full h-full rounded-full"
                      />
                    </Link>
                    <div className="flex flex-col gap-y-1  ">
                      <Link
                        to={`/profile/${reply?.slug}`}
                        className="text-base font-semibold hover:underline cursor-pointer lg:text-[18px]"
                      >
                        {reply?.user?.name}
                      </Link>
                      <span className="text-xs font-normal text-[#898c95] mb-[2px] block hover:underline cursor-pointer">
                        Đã đánh giá{" "}
                        {handleCalculateDateFromNow(
                          new Date(reply?.createdAt).toLocaleDateString("en-US")
                        )}{" "}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-[9px] px-[2px]">
                  <ReadMore range={200}>{reply?.name}</ReadMore>
                </div>
              </div>
            </div>
          </div>
        ))}
      {isShowModalImage.show && (
        <ModalImage
          imageList={item?.listImage}
          data={blog}
          url={import.meta.env.VITE_URL_REVIEWS}
          length={item?.photo?.length}
          index={isShowModalImage?.index}
          hideModalImage={() =>
            setIsShowModalImage((prev) => ({ ...prev, show: false, index: 0 }))
          }
        />
      )}
    </>
  );
}

export default JudgeUser;