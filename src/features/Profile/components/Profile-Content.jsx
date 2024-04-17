import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import VictoryTable from "./Victory-Table";
import ReviewItem from "./Review-Item";
import reviewsApi from "../../../api/reviewApi";
import Pagination from "../../../common/Pagination";

ProfileContent.propTypes = {
  data: PropTypes.object,
};

function ProfileContent({ data = {} }) {
  const [state, setState] = useState([]);
  const [filters, setFilters] = useState({ page: 1 });
  const [count, setCount] = useState(0);
  useEffect(() => {
    (async () => {
      const reviews = await reviewsApi.getAll({
        ...filters,
        userId: data?.id || 0,
      });
      const counted = await reviewsApi.getAll({
        page: 0,
        userId: data?.id || 0,
      });
      setState(reviews);
      setCount(counted?.length);
    })();
  }, [data, filters]);
  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="lg:flex block  justify-center lg:px-4 max-w-[1200px] mx-auto">
      <VictoryTable data={data} />
      <div className="lg:max-w-[720px] w-full  h-full">
        <div className="lg:pt-5 lg:pl-5">
          {state?.length > 0 &&
            state?.map((review, index) => (
              <ReviewItem key={index} data={review} />
            ))}
        </div>
        <div>
          <Pagination
            data={state}
            onChange={(page) => handlePageChange(page)}
            itemsPerPage={5}
            count={count}
            page={filters?.page}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
