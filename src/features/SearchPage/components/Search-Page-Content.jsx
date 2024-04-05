import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../../common/Pagination";
import SelectControl from "../../../components/Form-Control/Select-Control";
import { getLocalStorage, removeLocalStorage } from "../../../utils";
import { FiltersContext } from "../pages/Search-Page";
import CardFilter from "./Card-Filter";
import SearchPageItem from "./Search-Page-Item";
import queryString from "query-string";
SearchPageContent.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  count: PropTypes.number,
};
const itemsPerPage = 5;

const OPTIONS_LIST = [
  {
    id: 1,
    label: "Đúng nhất",
    value: "",
  },
  {
    id: 2,
    label: "Điểm đánh giá",
    value: "-ratingsAverage",
  },
  {
    id: 3,
    label: "Gần tôi nhất",
    value: "",
  },
];

function SearchPageContent({ data = [], onChange = null, count = 1 }) {
  const { handleSubmit, control } = useForm({});
  const navigate = useNavigate();
  const location = useLocation();
  const [filters] = useContext(FiltersContext);
  const [page, setPage] = useState(1);
  const handleOnChange = (value) => {
    if (!onChange) return null;

    onChange(value);
  };
  const handlePageChange = (page) => {
    setPage(page);
    if (!onChange) return null;
    onChange({ page: page });
  };
  const handleReset = () => {
    if (!onChange) return null;

    onChange({
      name: "",
      slugArea: null,
      slugPurpose: null,
      slugKind: null,
      slugConvenience: null,
    });
    navigate(`/search`);
  };
  return (
    <div className="">
      <div className="lg:mb-[22px] mb-[6px] flex items-center justify-between lg:px-0 px-[6px]">
        <span className="lg:text-[18px] text-base  ">
          <strong className="mr-1">{count}</strong>
          địa điểm khớp với tìm kiếm của bạn:
          {(filters?.slugArea ||
            filters?.slugPurpose ||
            filters?.slugConvenience ||
            filters?.slugKind ||
            queryString.parse(location.search)?.name?.length > 0) && (
            <span
              onClick={handleReset}
              className="mx-2 font-bold text-sm text-black cursor-pointer"
            >
              Xóa tất cả bộ loc
            </span>
          )}
        </span>

        <form
          onChange={handleSubmit(handleOnChange)}
          className="items-center gap-x-1 hidden lg:flex"
        >
          <span className="text-base">Sắp xếp theo:</span>
          <SelectControl control={control} options={OPTIONS_LIST} name="sort" />
        </form>
      </div>

      <CardFilter />

      <div>
        {data.map((item) => (
          <SearchPageItem data={item} key={item.id} />
        ))}
      </div>
      <div>
        <Pagination
          data={data}
          onChange={(page) => handlePageChange(page)}
          itemsPerPage={itemsPerPage}
          count={count}
          page={page}
        />
      </div>
    </div>
  );
}

export default SearchPageContent;
