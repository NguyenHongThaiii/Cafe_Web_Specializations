import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LayoutUser from "../../../components/Layout/Layout-User";
import PostReview from "../components/Post-Review";
import OutstandingArea from "../components/Outstanding-Area";
import reviewsApi from "../../../api/reviewApi";

ExplorePage.propTypes = {};

function ExplorePage(props) {
  const [itemHeight, setItemHeight] = useState(0);
  useEffect(() => {
    (async () => {
      const reviews = await reviewsApi.getAll({ page: 0, outstanding: 1 });
      setItemHeight(reviews?.length);
    })();
  }, []);

  return (
    <LayoutUser>
      <div className="bg-[linear-gradient(180deg,#ffb8b8,#fbfbfb)] bg-[-webkit-linear-gradient(top,#ffb8b8,#fbfbfb)]">
        <div className="max-w-[1200px] mx-auto md:flex block ">
          {/* left */}
          <div className="lg:p-0 pt-5 pb-14 px-4 lg:w-2/3 w-full">
            <PostReview itemHeight={itemHeight} />
          </div>
          {/* right */}
          <div className="lg:pt-5 lg:pl-5 w-1/3 md:block hidden">
            <OutstandingArea />
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}

export default ExplorePage;
