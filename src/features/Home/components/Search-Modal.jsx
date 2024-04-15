import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import blogsApi from "../../../api/blogsApi";
import SearchControl from "../../../components/Form-Control/Search-Control";
import { getLocalStorage, setLocalStorage } from "../../../utils";

SearchModal.propTypes = {
  show: PropTypes.bool,
  onShow: PropTypes.func,
  onSearch: PropTypes.func,
};

function SearchModal({ show, onShow = null, onSearch = null }) {
  const [state, setState] = useState(() => {
    return getLocalStorage("view_history") || [];
  });
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ limit: 5 });
  if (typeof document === "undefined") return <div>Modal</div>;
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await blogsApi.getAll(filters);
        setState(data);
        // setState([]);
      } catch (error) {
        console.log("Error 💥", error.message);
      }
    })();
  }, [filters]);

  const handleSearchChange = (value, e) => {
    e.preventDefault();
    setFilters((prev) => {
      return { ...prev, ...value };
    });
    onSearch(value);
    setLocalStorage("search_now", value?.name);
  };

  const handlePlacePace = (value) => {
    navigate(`/place/${value.slug}`);
  };
  return (
    <div
      className={`absolute left-0 right-0 top-0 hidden  rounded-[10px] bg-white z-10  ${
        show && "lg:block"
      }`}
    >
      <form
        className="p-3 flex"
        onChange={handleSubmit(debounce(handleSearchChange, 300))}
        onSubmit={(e) => e.preventDefault()}
      >
        <SearchControl
          control={control}
          name="name"
          placeholder="Nhập tên quán, khu vực, kiểu quán..."
          focus={show}
        />
        <h3
          className="shrink-0 text-base text-[#A0A0A0] font-semibold flex items-center justify-center pl-3 cursor-pointer"
          onClick={(e) => onShow(e)}
        >
          Hủy
        </h3>
      </form>

      <div className="px-3">
        <Link
          to="/search"
          className="flex items-center py-[6px] hover:bg-[#eee] transition-all duration-200"
        >
          <div className=" border-[3px] border-black rounded-full w-[40px] h-[40px] flex items-center justify-center mr-[10px]">
            <i className="fa-solid fa-location-arrow text-2xl"></i>
          </div>
          <span className="text-base font-semibold text-black">
            Tìm quanh đây
          </span>
        </Link>

        <div className="pt-[10px]">
          <h3 className="py-1 pb-1 text-base font-bold">Đã xem gần đây</h3>

          {state.map((item) => (
            <div key={item?.id}>
              <div
                onClick={() => handlePlacePace(item)}
                className="px-[6px] py-[10px] flex relative hover:bg-[#eee] cursor-pointer transition-all duration-300"
              >
                <img
                  src={item?.listImage?.length > 0 && item?.listImage[0]?.url}
                  alt=""
                  className="mr-[10px] w-[50px] h-[50px] object-cover rounded-[4px]"
                />
                <div className="pr-3 mr-[10px] flex-1">
                  <p className="text-base text-black font-semibold mb-[2px]">
                    {item?.name}
                  </p>
                  <p className="text-sm text-[#6b6b6b] ">{item?.description}</p>
                </div>

                <div className="absolute top-0 bottom-0 right-0  flex items-center justify-center z-10 ">
                  <i className="fa-solid fa-x cursor-pointer text-[#aaa] w-[30px] h-[30px] text-[20px] leading-[30px] text-center transition-all duration-300 hover:bg-[#ddd] hover:rounded-full"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
