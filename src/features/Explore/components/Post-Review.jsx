import React, { useEffect, useState } from "react";
import reviewsApi from "../../../api/reviewApi";
import ReviewItem from "../../Profile/components/Review-Item";
import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from "../../../common/Pagination";
PostReview.propTypes = {};

function PostReview() {
  const [state, setState] = useState([]);
  const [itemHeight, setItemHeight] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    outstanding: 0,
  });
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    (async () => {
      const reviews = await reviewsApi.getAll({ page: 0, outstanding: 0 });
      setItemHeight(reviews?.length);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const reviews = await reviewsApi.getAll(filters);
      setState(reviews);
      if (
        itemHeight <= reviews.length &&
        itemHeight !== 0 &&
        reviews.length !== 0
      )
        setHasMore(false);
    })();
  }, [filters]);
  const fetchMore = () => {
    const newFilters = { ...filters, limit: filters.limit + 2 };
    setFilters(newFilters);
  };
  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="w-full  h-full">
      <div className="lg:pt-5 lg:pl-5">
        {/* <InfiniteScroll
          scrollThreshold={0.8}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          next={fetchMore}
          dataLength={100} //This is important field to render the next data
        >
          {state?.map((review, index) => (
            <ReviewItem key={index} data={review} />
          ))}
        </InfiniteScroll> */}
        {state?.map((review, index) => (
          <ReviewItem key={index} data={review} />
        ))}
      </div>
      <div>
        <Pagination
          data={state}
          onChange={(page) => handlePageChange(page)}
          itemsPerPage={5}
          count={itemHeight}
          page={page}
        />
      </div>
    </div>
  );
}

export default PostReview;
