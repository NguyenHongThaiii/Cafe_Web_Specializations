import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import {
  FaEllipsisH,
  FaFlag,
  FaHeart,
  FaPencilAlt,
  FaRegHeart,
  FaReplyAll,
} from "react-icons/fa";
import {
  MdOutlineClose,
  MdStar,
  MdStarHalf,
  MdStarOutline,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import commentsApi from "../../../api/commentsApi";
import favoritesApi from "../../../api/favoritesApi";
import { handleCalculateDateFromNow } from "../../../utils";
import { showLoginPage } from "../../Auth/authSlice";
import CommentItem from "../../Profile/components/Comment-Item";
import ModalImage from "./Modal-Image";
import ReadMore from "./Read-More";
import ReplyUser from "./Reply-User";

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
  const [amountFavoriteReviews, setAmountFavoriteReviews] = useState(0);
  const [more, setMore] = useState(true);
  const moreRef = useRef(null);
  const [filters, setFilters] = useState({
    reviewId: item.id,
    page: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const handleClickFavor = (reviewId) => {
    if (!user?.id) {
      dispatch(showLoginPage());
      return;
    }
    // handleShowReply();
    // setShow(true);
    if (!onClick) return null;
    setIsSubmitting(true);
    if (isSubmitting) return;
    onClick(user?.id, reviewId);
    setFilters((prev) => ({ ...prev }));
    setIsSubmitting(false);
  };
  const handleShowReply = () => {
    setIsReply(true);
  };

  useEffect(() => {
    handleClick();
    window.addEventListener("resize", handleClick);

    (async () => {
      try {
        const data = await commentsApi.getAll(filters);
        const favor = await favoritesApi.getAmountFavoriteReview(item?.id);
        setAmountFavoriteReviews(favor);
        setReplies(data);
      } catch (error) {}
    })();

    return () => window.removeEventListener("resize", handleClick);
  }, [item, filters]);

  const handleClick = () => {
    if (moreRef && moreRef.current && moreRef.current?.offsetHeight > 90) {
      setMore(false);
    } else {
      setMore(true);
    }
  };
  const handleSubmitReply = async (data) => {
    if (!onSubmit) return;
    onSubmit(data);
  };
  const handleShowModalImage = (index) => {
    setIsShowModalImage((prev) => ({ ...prev, show: true, index }));
  };
  return (
    <>
      <div className="mt-1 pt-4 border-t-[1px] border-t-[#ddd] lg:pt-5 lg:mt-5">
        <div className="py-[5px] px-[10px] bg-[#eee] lg:bg-white  rounded-[12px] ">
          <div className="flex  justify-between border-b-[1px] border-b-[#e0e0e0] py-1  ">
            <div className="flex items-center">
              <Link
                to={`/profile/${item?.userDto?.slug}`}
                className="mr-[11px] w-10 h-10 lg:w-[64px] lg:h-[64px]"
              >
                <img
                  src={item?.userDto?.image?.url || "/img/user-default.jpg"}
                  alt={item?.userDto?.name}
                  className="w-full h-full rounded-full"
                />
              </Link>
              <div className="flex flex-col gap-y-1  ">
                <Link
                  to={`/profile/${item?.userDto?.slug}`}
                  className="text-base font-semibold hover:underline cursor-pointer lg:text-[18px] truncate-text-auto"
                >
                  {item?.userDto?.name}
                </Link>
                <div className="pt-[2px] flex items-center text-[14px] lg:mr-0 xs:mr-[-40px]">
                  {item?.rating?.averageRating > 0 && (
                    <span className="mr-[6px] font-bold lg:text-sm text-xs">
                      {item?.rating?.averageRating?.toFixed(1)}
                    </span>
                  )}
                  {Array.from(new Array(5)).map((x, index) =>
                    item?.rating?.averageRating >= index + 1 ? (
                      <MdStar
                        key={index}
                        className={`lg:text-[14px] text-[10px] text-primary`}
                      />
                    ) : item?.rating?.averageRating >= index + 0.5 ? (
                      <MdStarHalf
                        key={index}
                        className="lg:text-[14px] text-[10px] text-primary"
                      />
                    ) : (
                      <MdStarOutline
                        key={index}
                        className="lg:text-[14px] text-[10px]"
                      />
                    )
                  )}
                  <span className="mx-2 text-gray-400">●</span>{" "}
                  <span className=" lg:text-sm text-xs text-[#898c95] block">
                    Đã đánh giá{" "}
                    {handleCalculateDateFromNow(
                      new Date(item?.createdAt).toLocaleDateString("en-US")
                    )}
                  </span>
                </div>
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
                  {item?.listImage?.map((img, index) => (
                    <div
                      onClick={() => handleShowModalImage(index)}
                      className={`rounded-[6px] overflow-hidden relative lg:w-[116px] lg:h-[116px] w-[100px] h-[100px]  ${
                        index < 6 ? "block" : "hidden"
                      }`}
                      key={index}
                    >
                      {index === 5 && item?.listImage?.length > 6 && (
                        <div className="absolute inset-0 bg-[rgba(0,0,0,.4)] transition-all text-white flex items-center justify-center font-semibold cursor-pointer text-base">
                          +{item?.listImage?.length - 5} ảnh
                        </div>
                      )}

                      {(index !== 2 || item?.listImage?.length <= 3) && (
                        <div className="absolute inset-0 cursor-pointer hover:bg-[rgba(0,0,0,.4)] transition-all"></div>
                      )}
                      <img
                        src={img?.url}
                        alt={img}
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
              amountFavoriteReviews > 0 ? "text-primary  " : ""
            }`}
          >
            {amountFavoriteReviews > 0 ? (
              <FaHeart className={`w-3 h-3 mr-1 `} />
            ) : (
              <FaRegHeart className={`w-3 h-3 mr-1 `} />
            )}
            {amountFavoriteReviews > 0 && (
              <span className="mx-[2px] ">{amountFavoriteReviews}</span>
            )}
            Thích
          </button>
          <button
            onClick={() => {
              if (!user?.id) {
                dispatch(showLoginPage());
                return;
              }
              handleShowReply();
              setShow(true);
            }}
            className="before:content-['●'] before:inline-block lg:text-sm before:text-[#c1c1c1] before:mx-[6px] before:text-[12px] first:before:hidden "
          >
            Trả lời
          </button>
        </div>

        <div className="group relative min-w-[150px] flex justify-end">
          <FaEllipsisH className="relative cursor-pointer" />
          <div className="absolute hidden group-hover:block bg-white shadow-[0_2px_8px_rgb(0,0,0,0.15)] mt-3 rounded-md ">
            {item?.userDto?.id === user.id ? (
              <div>
                <div className="cursor-pointer transition-all hover:bg-gray-300  py-1 px-3 text-sm flex items-center gap-2">
                  <FaPencilAlt />
                  Chỉnh sửa
                </div>
                <div className="cursor-pointer transition-all hover:bg-gray-300  py-1 px-3 text-sm flex items-center gap-2">
                  <MdOutlineClose className="text-lg" />
                  Xóa
                </div>
              </div>
            ) : (
              <div>
                <div className="cursor-pointer transition-all hover:bg-gray-300 py-1 px-3 text-sm flex items-center gap-2">
                  <FaFlag />
                  Báo cáo
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isReply && (
        <ReplyUser
          isReply={isReply}
          review={item}
          onSubmit={handleSubmitReply}
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
                        src={reply?.user?.image?.url || "/img/user-default.jpg"}
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
            <CommentItem user={user} item={reply} />
          </div>
        ))}
      {isShowModalImage.show && (
        <ModalImage
          imageList={item?.listImage}
          data={item}
          length={item?.listImage?.length}
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
