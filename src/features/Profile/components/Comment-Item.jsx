import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaEllipsisH, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoginPage } from "../../Auth/authSlice";
import favoritesApi from "../../../api/favoritesApi";

CommentItem.propTypes = {
  item: PropTypes.object,
  user: PropTypes.object,
};

function CommentItem({ item = {}, user = {} }) {
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

      <div>
        <button className="text-xs flex items-center gap-x-1">
          <FaEllipsisH />
        </button>
      </div>
    </div>
  );
}

export default CommentItem;
