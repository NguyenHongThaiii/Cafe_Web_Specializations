import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { handleCalculateDateFromNow } from "../../../utils";
import ReadMore from "./../../Place/components/Read-More";
import { showLoginPage } from "../../Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import favoritesApi from "../../../api/favoritesApi";
import CommentItem from "./Comment-Item";
ReviewItemReply.propTypes = {
  listReplies: PropTypes.array,
  onClick: PropTypes.func,
};

function ReviewItemReply({ listReplies = [], onClick = null }) {
  const [state, setState] = useState([]);
  const user = useSelector((state) => state.auth.current);

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
            <CommentItem item={item} user={user} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewItemReply;
