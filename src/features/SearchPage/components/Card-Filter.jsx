import React, { useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiltersContext } from "./../pages/Search-Page";

CardFilter.propTypes = {};

const NAME_LIST = ["slugPurpose", "slugArea", "slugConvenience", "slugKind"];

function CardFilter(props) {
  const [filters, setFilters] = useContext(FiltersContext);
  const newFilters = NAME_LIST.map((item) => {
    if (filters && filters[item]) {
      return { [item]: filters[item] };
    }
  });

  const handleOnRemove = (key) => {
    switch (key) {
      case "slugPurpose": {
        setFilters((prev) => {
          return { ...prev, slugPurpose: null };
        });
        break;
      }
      case "slugArea": {
        setFilters((prev) => {
          return { ...prev, slugArea: null };
        });
        break;
      }
      case "slugConvenience": {
        setFilters((prev) => {
          return { ...prev, slugConvenience: null };
        });
        break;
      }

      case "slugKind": {
        setFilters((prev) => {
          return { ...prev, slugKind: null };
        });
        break;
      }
      default:
        break;
    }
  };
  return (
    <div className="mb-3  grid-cols-3 gap-3 hidden lg:grid">
      {newFilters[0]?.slugPurpose && (
        <div className="text-primary relative flex items-center justify-center bg-white border text-center font-bold border-primary rounded-full py-1 px-2 text-base">
          <span className="grow">{newFilters[0]?.slugPurpose}</span>
          <AiOutlineClose
            onClick={() => handleOnRemove(NAME_LIST[0])}
            className="ml-2 text-[rgba(0,0,0,.25)] text-xl cursor-pointer"
          />
        </div>
      )}
      {newFilters[1]?.slugArea && (
        <div
          key={newFilters[1]?.slugArea}
          className="text-primary relative flex items-center justify-center bg-white border text-center font-bold border-primary rounded-full py-1 px-2 text-base"
        >
          <span className="grow">{newFilters[1]?.slugArea}</span>
          <AiOutlineClose
            onClick={() => handleOnRemove(NAME_LIST[1])}
            className="ml-2 text-[rgba(0,0,0,.25)] text-xl cursor-pointer"
          />
        </div>
      )}

      {newFilters[2]?.slugConvenience && (
        <div className="text-primary relative flex items-center justify-center bg-white border text-center font-bold border-primary rounded-full py-1 px-2 text-base">
          <span className="grow">{newFilters[2]?.slugConvenience}</span>
          <AiOutlineClose
            onClick={() => handleOnRemove(NAME_LIST[2])}
            className="ml-2 text-[rgba(0,0,0,.25)] text-xl cursor-pointer"
          />
        </div>
      )}
      {newFilters[3]?.slugKind && (
        <div className="text-primary relative flex items-center justify-center bg-white border text-center font-bold border-primary rounded-full py-1 px-2 text-base">
          <span className="grow">{newFilters[3]?.slugKind}</span>
          <AiOutlineClose
            onClick={() => handleOnRemove(NAME_LIST[3])}
            className="ml-2 text-[rgba(0,0,0,.25)] text-xl cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

export default CardFilter;
