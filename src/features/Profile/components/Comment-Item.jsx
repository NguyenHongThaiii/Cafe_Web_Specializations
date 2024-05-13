import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FaEllipsisH,
  FaFlag,
  FaHeart,
  FaPencilAlt,
  FaRegHeart,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoginPage } from "../../Auth/authSlice";
import favoritesApi from "../../../api/favoritesApi";
import { MdOutlineClose } from "react-icons/md";
import commentsApi from "../../../api/commentsApi";
import { toast } from "react-toastify";
CommentItem.propTypes = {
  item: PropTypes.object,
  user: PropTypes.object,
  onReFetch: PropTypes.func,
};

function CommentItem({ item = {}, user = {}, onReFetch = null }) {
  const [filters, setFilters] = useState({
    commentId: item?.id,
    userId: user?.id,
  });
  const [amountFavoriteComment, setAmountFavoriteComment] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const data = await favoritesApi.getAmountFavoriteComment(
          filters?.commentId || item?.id
        );
        setAmountFavoriteComment(data);
      } catch (error) {
        console.log("Error", error);
      }
    })();
  }, [item, filters]);
  const handleClickFavor = async (commentId) => {
    try {
      if (!user?.id) {
        const action = showLoginPage();
        dispatch(action);
        return;
      }
      await favoritesApi.toggleFavoriteComment({ userId: user?.id, commentId });
      setFilters((prev) => ({
        ...prev,
        userId: user?.id,
        commentId: item?.id,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteComment = async (commentId) => {
    if (!onReFetch) return;
    try {
      await commentsApi.deleteComment({
        id: commentId,
        reviewId: item?.reivewId,
      });
      toast("Bạn đã xóa bình luận thành công.");
      onReFetch((prev) => ({ ...prev, page: 0, reviewId: item?.reivewId }));
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau!");
    }
  };
  return (
    <div className="mt-1 px-5 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => handleClickFavor(item?.id)}
          className={`text-xs flex items-center gap-x-1 ${
            amountFavoriteComment > 0 && "text-primary"
          }`}
        >
          {amountFavoriteComment > 0 ? (
            <>
              <FaHeart />
              {amountFavoriteComment} Thích
            </>
          ) : (
            <>
              <FaRegHeart />
              Thích
            </>
          )}
        </button>
        {/* <div className="text-[#f1f1f1] mx-3 inline-block ">●</div> */}
        {/* <button className="text-xs flex items-center gap-x-1">Trả lời</button> */}
      </div>

      <div className="group relative min-w-[150px] flex justify-end">
        <FaEllipsisH className="relative cursor-pointer" />
        <div className="absolute hidden group-hover:block bg-white shadow-[0_2px_8px_rgb(0,0,0,0.15)] mt-3 rounded-md ">
          {item?.user?.id === user.id ? (
            <div>
              {/* <div className="cursor-pointer transition-all hover:bg-gray-300  py-1 px-3 text-sm flex items-center gap-2">
                <FaPencilAlt />
                Chỉnh sửa
              </div> */}
              <div
                onClick={() => handleDeleteComment(item?.id)}
                className="cursor-pointer transition-all hover:bg-gray-300  py-1 px-3 text-sm flex items-center gap-2"
              >
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
  );
}

export default CommentItem;
