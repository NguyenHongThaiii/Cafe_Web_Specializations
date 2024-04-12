import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  FaCaretRight,
  FaRegCommentAlt,
  FaRegHeart,
  FaHeart,
  FaRegShareSquare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleCalculateDateFromNow } from "../../../utils";
import ReadMore from "../../Place/components/Read-More";
import ReviewItemForm from "./Review-Item-Form";
import ReviewItemReply from "./Review-Item-Reply";
import GridImage from "../../../components/ChildrenComponent/Grid-Image";
import reviewsApi from "../../../api/reviewApi";
import favoritesApi from "../../../api/favoritesApi";
import commentsApi from "../../../api/commentsApi";
import blogsApi from "../../../api/blogsApi";

ReviewItem.propTypes = {
  data: PropTypes.object,
};

function ReviewItem({ data = {} }) {
  const [state, setState] = useState({});
  const [show, setShow] = useState(false);
  const [hideTextarea, setHideTextarea] = useState(true);
  const [filterFavor, setFilterFavor] = useState({});
  const [filterComment, setFilterComment] = useState({});
  const [loadingFavor, setLoadingFavor] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const user = useSelector((state) => state.auth.current);
  useEffect(() => {
    (async () => {
      try {
        const favor = await favoritesApi.getAmountFavoriteReview(
          filterFavor?.id || data?.id
        );
        const comments = await commentsApi.getAll({
          page: filterComment?.page || 0,
          reviewId: filterComment?.reviewId || data?.id,
        });
        const blog = await blogsApi.getById(data?.productId);
        setState({ favorite: favor, comments, blog });
        // const data = await reviewsApi.getAll({ id: reviewId });
        // setState(data.data[0]);
      } catch (error) {
        console.log("Error", error);
      }
    })();
  }, [data, filterFavor]);
  const handleToggleShow = () => {
    setShow((prev) => !prev);
  };

  const handleClickFavor = async () => {
    try {
      if (loadingFavor) return;
      setLoadingFavor(true);
      await favoritesApi.toggleFavoriteReview({
        reviewId: data?.id,
        userId: user?.id,
      });
      setFilterFavor(() => ({ id: data?.id }));
    } catch (error) {
      console.log(error);
    }
    setLoadingFavor(false);
  };
  const handleCreateReply = async (value) => {
    try {
      if (loadingComment) return;
      setLoadingComment(true);
      await commentsApi.createComment({
        name: value?.name,
        userId: user?.id,
        reviewId: data?.id,
        status: 1,
      });
      setFilterFavor(() => ({ reviewId: data?.id, page: 0 }));
      setShow(true);
    } catch (error) {
      console.log(error);
    }
    setLoadingComment(false);
  };
  const handleClickFavorReply = (replyId) => {
    // const socket = io.connect("http://localhost:5000");
    // socket.emit("favorReply", {
    //   userId: user?._id,
    //   reviewId: state?._id,
    //   replyId,
    // });
  };
  return (
    <div className="bg-white lg:py-3 py-2 px-4 lg:mb-5 mb-2 rounded-[10px] shadow-[0_2px_8px_rgb(0,0,0,0.15)] ">
      <div className="pb-1 flex items-center">
        <div className="bg-[#eee] shrink-0 w-[46px] h-[46px] rounded-full overflow-hidden">
          <img
            src={data?.userDto?.image?.url}
            alt="img-user"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-2 mr-[30px] grow flex flex-col justify-center">
          <div className="flex items-center">
            <Link
              to={`/profile/${state?.userDto?.slug || "thainguyen"}`}
              className="mr-[5px] text-lg text-black font-semibold tracking-[0.4px] hover:underline transition-all"
            >
              {data?.userDto?.name}
            </Link>
            <FaCaretRight className="m-0 w-3 text-[#cbcbcb]" />
            <Link
              to={`/place/${state?.blog?.slug}`}
              className="text-lg text-black font-semibold tracking-[0.4px] hover:underline transition-all "
            >
              {state?.blog?.name}
            </Link>
          </div>
          <span className=" text-sm text-[#898c95] block">
            Đã đánh giá{" "}
            {handleCalculateDateFromNow(
              new Date(state?.createdAt).toLocaleDateString("en-US")
            )}
          </span>
        </div>
      </div>

      <div className="py-1 px-[2px] ">
        <ReadMore range={200}>{data?.name || ""}</ReadMore>
        <div className="mt-1">
          {state?.photo?.length > 0 && (
            <GridImage
              length={data?.listImage?.length}
              imageList={data?.listImage}
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-around py-1 mt-[10px] border-t-[1px] border-t-[#eee] border-b-[1px] border-b-[#eee]">
        <button
          onClick={handleClickFavor}
          className={`w-full flex items-center justify-center gap-x-2 text-base py-1 outline-none bg-transparent transition-all hover:bg-[#eee] rounded-[6px] ${
            state?.favorite > 0 ? "text-primary" : ""
          }`}
        >
          {state?.favorite > 0 ? (
            <>
              <FaHeart className="text-primary" />
              {state?.favorite} Thích
            </>
          ) : (
            <>
              <FaRegHeart />
              Thích
            </>
          )}
        </button>
        <button
          onClick={() => setHideTextarea((prev) => !prev)}
          className="w-full flex items-center justify-center gap-x-2 text-base py-1 outline-none bg-transparent transition-all hover:bg-[#eee] rounded-[6px]"
        >
          <FaRegCommentAlt />
          {state?.comments?.length} Bình luận
        </button>
        <button className="w-full flex items-center justify-center gap-x-2 text-base py-1 outline-none bg-transparent transition-all hover:bg-[#eee] rounded-[6px]">
          <FaRegShareSquare />
          Chia sẻ
        </button>
      </div>

      {user?.name && hideTextarea && (
        <ReviewItemForm user={user} onSubmit={handleCreateReply} />
      )}
      {show && (
        <ReviewItemReply
          listReplies={state?.comments}
          onClick={handleClickFavorReply}
        />
      )}

      {state?.comments?.length > 0 && (
        <div
          className="text-center mt-2 text-black font-medium cursor-pointer hover:underline transition-all"
          onClick={handleToggleShow}
        >
          {show ? "Ẩn tất cả" : "Xem tất cả"} {state?.comments?.length} bình
          luận ...
        </div>
      )}
    </div>
  );
}

export default ReviewItem;
