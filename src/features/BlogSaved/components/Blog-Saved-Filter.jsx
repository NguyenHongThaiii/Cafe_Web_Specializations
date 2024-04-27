import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHide } from "../../../context/Global-Provider";
import AreaFilter from "../../SearchPage/components/Area-Filter";
import TimeStartFilter from "../../SearchPage/components/Time-Start-Filter";
import BlogSaveFilterMobile from "./Blog-Save-Filter-Mobile";
import areasApi from "../../../api/areasApi";
import purposesApi from "../../../api/purposesApi";
import kindsApi from "../../../api/kindsApi";
import conveniencesApi from "../../../api/conveniencesApi";
import { TIME_DATA } from "../../../constant";

BlogSavedFilter.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
  show: PropTypes.bool,
  onShow: PropTypes.func,
};
const LIMIT = 30;
function BlogSavedFilter({
  onChange = null,
  filters = {},
  show = false,
  onShow = null,
}) {
  const [state, setState] = useState({});
  const [hide, setHide] = useHide();

  useEffect(() => {
    (async () => {
      const areas = await areasApi.getAll({ limit: LIMIT });
      const purposes = await purposesApi.getAll({ limit: LIMIT });
      const kinds = await kindsApi.getAll({ limit: LIMIT });
      const conveniences = await conveniencesApi.getAll({ limit: LIMIT });
      const data = {
        areas,
        purposes,
        kinds,
        conveniences,
      };
      setState(data);
    })();
  }, []);
  const handleOnChange = (value) => {
    if (!onChange) return null;
    onChange(value);
  };
  const handleReset = () => {
    onChange({
      topic: undefined,
      area: undefined,
      convenient: undefined,
      type: undefined,
      price: undefined,
      timeStart: undefined,
      name: "",
    });
    onShow();
    setHide(false);
  };
  return (
    <>
      <div className="w-1/4 p-3 h-full hidden lg:block">
        <div className="px-[14px] py-[10px] rounded-[10px] drop-shadow-2xl bg-white">
          <div className=" ">
            <h2 className="py-4 text-[21px] font-semibold  border-b border-b-[#e0e0e0]">
              Bộ lộc địa điểm{" "}
            </h2>
          </div>
          <div>
            <TimeStartFilter
              filters={filters}
              title="Giờ mở cửa"
              type="radio"
              data={TIME_DATA || []}
              name="timeStart"
              onChange={handleOnChange}
              col={true}
            />
            <AreaFilter
              filters={filters}
              title="Khu vực"
              data={state?.areas || []}
              name="area"
              type="radio"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
      {/*  */}
      <BlogSaveFilterMobile
        show={show}
        onShow={() => onShow()}
        handleReset={handleReset}
        data={state}
        handleOnChange={handleOnChange}
        filters={filters}
      />
    </>
  );
}

export default BlogSavedFilter;
