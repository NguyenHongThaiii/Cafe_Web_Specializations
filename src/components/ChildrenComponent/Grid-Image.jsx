import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalImage from "../../features/Place/components/Modal-Image";

GridImage.propTypes = {
  length: PropTypes.number,
  imageList: PropTypes.array,
  data: PropTypes.object,
};

function GridImage({ length = 1, imageList = [], data = {} }) {
  const [state, setState] = useState({ show: false, indexCurr: 0 });

  const handleHideModalImage = () => {
    setState({ show: false, indexCurr: 0 });
  };
  const handleShowModalImage = (index) => {
    setState({ show: true, indexCurr: index });
  };
  return (
    <div
      className={`grid gap-1 ${length === 1 && "grid-cols-1 grid-rows-1 "} ${
        length === 2 && "grid-cols-2  grid-rows-1"
      } ${length === 3 && "grid-cols-6 grid-rows-4"} ${
        length === 4 && "grid-cols-4 grid-rows-4 "
      } ${length >= 5 && "grid-cols-6 grid-rows-2"} `}
    >
      {imageList?.slice(0, 5)?.map((image, i) => (
        <div
          onClick={() => handleShowModalImage(i)}
          key={`${image?.id} + ${i}`}
          className={`relative ${
            (imageList.length === 1 || imageList.length === 2) && "w-full"
          }
          
          ${i + 1 === 1 && imageList.length === 3 && "col-span-4 row-span-4"}
          ${i + 1 === 2 && imageList.length === 3 && "col-span-2 row-span-2"}
          ${i + 1 === 3 && imageList.length === 3 && "col-span-2 row-span-2"}

          ${i + 1 === 1 && imageList.length === 4 && "col-span-2 row-span-2"}
          ${i + 1 === 2 && imageList.length === 4 && "col-span-2 row-span-2"}
          ${i + 1 === 3 && imageList.length === 4 && "col-span-2 row-span-2"}
          ${i + 1 === 4 && imageList.length === 4 && "col-span-2 row-span-2"}


          ${i + 1 === 1 && imageList.length >= 5 && "col-span-3 row-span-1"}
          ${i + 1 === 2 && imageList.length >= 5 && "col-span-3 row-span-1"}
          ${i + 1 === 3 && imageList.length >= 5 && "col-span-2 row-span-1"}
          ${i + 1 === 4 && imageList.length >= 5 && "col-span-2 row-span-1"}
          ${i + 1 === 5 && imageList.length >= 5 && "col-span-2 row-span-1"}

          `}
        >
          <img
            src={image?.url}
            alt={image?.url}
            className={`w-full h-full ${
              imageList?.length > 1 && imageList
                ? length !== 3 && "max-w-[400px] max-h-[300px]"
                : " max-h-[600px] max-w-[774px]"
            }  cursor-pointer object-cover`}
          />
          {imageList?.length > 5 && i === 4 && (
            <div
              className="absolute text-white font-bold flex items-center justify-center text-[24px] inset-0 bg-[rgba(0,0,0,.45)] cursor-pointer z-10"
              onClick={() => handleShowModalImage(i)}
            >
              + {imageList?.length - 5}
            </div>
          )}
        </div>
      ))}

      {state?.show && (
        <ModalImage
          data={data}
          imageList={imageList}
          hideModalImage={handleHideModalImage}
          index={state?.indexCurr}
          url={`${import.meta.env.VITE_URL_REVIEWS}`}
          length={imageList?.length}
        />
      )}
    </div>
  );
}

export default GridImage;
