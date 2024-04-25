import queryString from "query-string";
import React, { createContext, useEffect, useRef, useState } from "react";
import { BsPinMap, BsSliders } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import LayoutUser from "../../../components/Layout/Layout-User";
import { useHide } from "../../../context/Global-Provider";
import SearchPageContent from "../components/Search-Page-Content";
import SearchPageFilter from "../components/Search-Page-Filter";
import blogsApi from "../../../api/blogsApi";
import NotFoundItem from "../components/Not-Found-Item";

SearchPage.propTypes = {};
export const FiltersContext = createContext([]);
export const ResetContext = createContext([]);

function SearchPage(props) {
  const [state, setState] = useState([]);
  const [count, setCount] = useState(0);
  const [isReset, setIsReset] = useState(false);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useHide();
  const location = useLocation();

  const [filters, setFilters] = useState(() => {
    const queryParams = queryString.parse(location.search);

    return {
      limit: 5,
      name: queryParams.name ? queryParams.name : undefined,
      slugArea: queryParams.areas ? queryParams.areas : undefined,
      slugPurpose: queryParams.purposes ? queryParams.purposes : undefined,
      slugKind: queryParams.kind ? queryParams.kind : undefined,
      slugConvenience: queryParams.convenience
        ? queryParams.convenience
        : undefined,
    };
  });
  const scrollRef = useRef(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await blogsApi.getAll(filters);
        const filterShifts = { ...filters, page: 0 };
        const count = await blogsApi.getAll(filterShifts);
        setState(data);
        setCount(count?.length || 0);
      } catch (error) {
        console.log("Error 💥", error.message);
      }
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    })();
  }, [filters]);
  const handleOnChange = (value) => {
    if (value?.rating === 0)
      setFilters((prev) => {
        return { ...prev, ...value, rating: null };
      });
    else
      setFilters((prev) => {
        return { ...prev, ...value };
      });
  };
  console.log(filters);
  return (
    <LayoutUser>
      <FiltersContext.Provider value={[filters, setFilters]}>
        <ResetContext.Provider value={[isReset, setIsReset]}>
          <div className={`pt-[10px] min-h-[70vh] relative `}>
            <div className="max-w-[1200px] mx-auto lg:px-4 flex">
              {/* left */}

              <SearchPageFilter
                onChange={handleOnChange}
                show={show}
                onShow={() => setShow(false)}
                filters={filters}
              />

              {/* right */}
              <div
                className="lg:w-3/4 lg:p-3 w-full pb-[120px]"
                ref={scrollRef}
              >
                <SearchPageContent
                  data={state || []}
                  count={count || 0}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="fixed bottom-[72px] inset-x-0 flex items-end justify-center lg:hidden">
              <div
                onClick={() => {
                  setShow(true);
                  setHide(true);
                }}
                className="relative cursor-pointer flex items-center gap-x-2 text-[#111] py-[2px] px-[12px] mx-1 rounded-full shadow-[0_0_8px_2px_rgb(0,0,0,0.3)] text-base bg-white font-normal"
              >
                <BsSliders className=" text-lg" />
                <span className="absolute top-[-2px] right-[-2px] w-[12px] h-[12px] rounded-full bg-primary"></span>
                Bộ lọc
              </div>
              <div className="relative cursor-pointer flex items-center gap-x-2 text-[#111] py-[2px] px-[12px] mx-1 rounded-full shadow-[0_0_8px_2px_rgb(0,0,0,0.3)] text-base bg-white font-normal">
                <BsPinMap className=" text-lg" />
                Bản đồ
              </div>
            </div>
          </div>
        </ResetContext.Provider>
      </FiltersContext.Provider>
    </LayoutUser>
  );
}

export default SearchPage;
