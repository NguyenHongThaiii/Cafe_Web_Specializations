import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import favoritesApi from "../../../api/favoritesApi";
import reviewsApi from "../../../api/reviewApi";
import Pagination from "../../../common/Pagination";
import JudgeUser from "./Judge-User";
import ModalReviewMobile from "./Modal-Review-Mobile";
import { showLoginPage } from "../../Auth/authSlice";
import commentsApi from "../../../api/commentsApi";

JudgePublic.propTypes = {
  item: PropTypes.object,
  show: PropTypes.bool,
  onShow: PropTypes.func,
  hideShow: PropTypes.func,
};

function JudgePublic({
  item = {},
  show = false,
  onShow = null,
  hideShow = null,
}) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(1);
  const [filters, setFilers] = useState({
    page: 1,
    limit: 5,
    sortBy: "createdAtDesc",
  });
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const data = await reviewsApi.getAll({ ...filters, productId: item?.id });
      const count = await reviewsApi.getAll({ page: 0, productId: item?.id });
      setReviews(data);
      setCount(count?.length);
    })();
  }, [filters, item]);

  const handlePageChange = (page) => {
    setPage(page);
    setFilers((prev) => ({ ...prev, page }));
  };

  const handleClickFavor = async (userId, reviewId) => {
    try {
      if (!userId) {
        const action = showLoginPage();
        dispatch(action);
        return;
      }
      await favoritesApi.toggleFavoriteReview({ userId, reviewId });
    } catch (error) {}
  };
  const handleCreateReply = async (data) => {
    await commentsApi.createComment(data);
    setFilers((prev) => ({ ...prev }));
  };
  return (
    <div className="pt-1 px-[14px] pb-[10px] mb-[6px] lg:px-4 lg:py-2 shadow-[0_1px_4px_rgb(0,0,0,0.3)] rounded-[10px] flex-1 h-fit">
      <div className="flex items-center justify-between pb-[6px]">
        <h2 className="text-xl lg:text-[28px] font-semibold">
          Đánh giá từ cộng đồng{" "}
          <span className=" text-[#8a8a8a]">({count})</span>
        </h2>
        <button
          onClick={onShow}
          className="bg-primary text-white py-[6px] px-2 font-bold text-sm rounded-[10px] border border-primary hover:bg-[#be0129] transition-all duration-150"
        >
          Viết đánh giá
        </button>
      </div>

      <div className="lg:px-4 lg:py-[10px] flex items-center justify-between lg:justify-center px-[2px] mt-1 mb-2 rounded-[20px] bg-[linear-gradient(90deg,#ffb8b8,#ffddd8)] relative before:absolute before:top-[-10px]  before:right-[36px] before:border-b-[10px] before:border-b-[#ffdcd8] before:border-r-transparent before:border-r-[10px] before:border-l-transparent before:border-l-[10px]">
        <div className="w-[65%] lg:w-[30%] flex lg:block lg:ml-4">
          <img
            src="/img/online-review.svg"
            alt="online-review"
            className="max-h-[160px]"
          />
        </div>
        <div className="basis-[35%] lg:w-full lg:basis-full py-[10px] px-1 lg:px-2 lg:grow lg:ml-4">
          <h2 className="text-base mb-1 font-medium lg:text-[24px] lg:mb-3">
            Bạn đã từng đến đây?
          </h2>
          <p className="text-xs mb-[2px] leading-[1.7] lg:text-sm ">
            Chia sẻ trải nghiệm và cảm nhận của bản thân cho mọi người cùng biết
            ❤️
          </p>
          <p className="text-xs leading-[1.7] lg:text-sm mb-[2px]">
            Những review chất lượng sẽ được xuất hiện ở bảng tin đấy!
          </p>
        </div>
      </div>

      {reviews.length > 0 &&
        reviews.map((review) => (
          <div key={review.id}>
            <JudgeUser
              onSubmit={handleCreateReply}
              item={review}
              blog={item}
              onClick={handleClickFavor}
            />
          </div>
        ))}

      {count > 5 && (
        <div>
          <Pagination
            data={reviews}
            onChange={(page) => handlePageChange(page)}
            itemsPerPage={5}
            count={count}
            page={page}
          />
        </div>
      )}

      {show && (
        <ModalReviewMobile
          item={item}
          onShow={hideShow}
          onSubmit={(values) => setReviews((prev) => [...prev, values])}
          onReFetch={setFilers}
        />
      )}
    </div>
  );
}

export default JudgePublic;
