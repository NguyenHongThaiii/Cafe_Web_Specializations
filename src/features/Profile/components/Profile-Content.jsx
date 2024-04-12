import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import VictoryTable from "./Victory-Table";
import ReviewItem from "./Review-Item";
import reviewsApi from "../../../api/reviewApi";

ProfileContent.propTypes = {
  data: PropTypes.object,
};

function ProfileContent({ data = {} }) {
  const [state, setState] = useState([]);
  useEffect(() => {
    (async () => {
      const reviews = await reviewsApi.getAll({
        userId: data?.id || 0,
        page: 0,
      });
      setState(reviews);
    })();
  }, [data]);
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
      </div>
    </div>
  );
}

export default ProfileContent;
