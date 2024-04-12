import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ModalImage from "../components/Modal-Image";
import LayoutUser from "../../../components/Layout/Layout-User";
import blogsApi from "../../../api/blogsApi";

PhotoPage.propTypes = {
  data: PropTypes.object,
};

function PhotoPage({ data = {} }) {
  const location = useLocation();
  const slug = location?.pathname?.split("/")[2] || "";
  const [state, setState] = useState({});
  const [modalImg, setModalImg] = useState({ indexCurr: 0, show: false });
  useEffect(() => {
    (async () => {
      try {
        const data = await blogsApi.getBySlug(slug);
        setState(data);
      } catch (error) {
        console.log("Error", error);
      }
    })();
  }, []);
  const handleHideModalImage = () => {
    setModalImg((prev) => ({ ...prev, indexCurr: 0, show: false }));
  };
  const handleShowModalImage = (index) => {
    setModalImg((prev) => ({ ...prev, indexCurr: index, show: true }));
  };
  return (
    <LayoutUser>
      <div className="bg-white max-w-[1200px] mx-auto rounded-[10px] py-3 lg:px-5 px-[6px] shadow-[0_1px_4px_rgb(0,0,0,0.15)] my-[10px] mb-[70px] lg:mb-[10px] ">
        <div className="  ">
          <div className="px-[54px] mb-[14px] text-center relative">
            <Link
              to={`/place/${state.slug}`}
              className="text-[rgba(0,0,0,.85)] text-[20px] font-medium lg:text-[28px]"
            >
              {state?.name}
            </Link>
            <h3 className="text-[rgba(0,0,0,.85)] text-sm font-medium lg:text-lg">
              {state?.startLocation?.address?.split(",")[1]}
            </h3>

            <Link
              to={`/place/${state.slug}`}
              className="absolute flex items-center gap-x-3 left-[2px] top-[10px] text-[20px] rounded-[20px] bg-[#f0f2f5] font-semibold py-[6px] px-[20px]"
            >
              <FaArrowLeft />
              <span className="lg:block hidden text-[18px]"> Trở về</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {state?.listImage?.length > 0 &&
              state?.listImage?.map((item, index) => (
                <div key={index}>
                  <img
                    onClick={() => handleShowModalImage(index)}
                    src={item?.url}
                    alt={item?.url}
                    className="w-full h-full object-cover max-h-[318px] min-h-[200px] lg:max-h-[285px] cursor-pointer rounded-[6px]"
                  />
                </div>
              ))}
          </div>
        </div>
        {modalImg?.show && (
          <ModalImage
            data={state}
            imageList={state?.listImage}
            length={state?.listImage?.length}
            index={modalImg?.indexCurr}
            hideModalImage={handleHideModalImage}
          />
        )}
      </div>
    </LayoutUser>
  );
}

export default PhotoPage;
