import React, { useEffect, useRef, useState } from "react";
import { FaSort } from "react-icons/fa";
import { useSelector } from "react-redux";
import Pagination from "../../../common/Pagination";
import { useHide } from "../../../context/Global-Provider";
import SearchPageItem from "../../SearchPage/components/Search-Page-Item";
import BlogSavedFilter from "./Blog-Saved-Filter";
import blogSavedApi from "../../../api/blog-savedApi";
import BlogSaveEmpty from "./Blog-Save-Empty";

BlogSavedContent.propTypes = {};
const itemsPerPage = 5;

function BlogSavedContent(props) {
  const user = useSelector((state) => state.auth.current);
  const [count, setCount] = useState(0);
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    limit: itemsPerPage,
    userId: user?.id,
  });
  const scrollRef = useRef(null);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useHide();
  useEffect(() => {
    (async () => {
      try {
        const data = await blogSavedApi.getAll(filters);
        const counted = await blogSavedApi.getAll({ ...filters, page: 0 });
        setCount(counted?.length || 0);
        setState(data);
      } catch (error) {
        console.log("Error 💥 ", error.message);
      }
    })();

    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [filters]);
  const handleOnChange = (value) => {
    setFilters((prev) => {
      return { ...prev, ...value };
    });
  };
  const handlePageChange = (page) => {
    setPage(page);
    setFilters((prev) => {
      return { ...prev, page };
    });
  };
  if (count <= 0) return <BlogSaveEmpty />;
  return (
    <div className=" max-w-[1200px] mx-auto px-4  flex flex-col lg:flex-row pb-[70px]">
      <BlogSavedFilter
        onChange={handleOnChange}
        filters={filters}
        show={show}
        onShow={() => {
          setShow(false);
        }}
      />

      <div className="p-[10px] lg:hidden flex items-center justify-between">
        <h1 className="text-[18px] font-bold text-[#1d2129]">
          Danh sách đã lưu
        </h1>
        <div
          className="flex items-center text-[#1d2129] font-medium cursor-pointer"
          onClick={() => {
            setShow(true);
            setHide(true);
          }}
        >
          <FaSort /> Lọc
        </div>
      </div>

      <div className="lg:w-3/4 lg:p-3 w-full pb-[120px]" ref={scrollRef}>
        <div>
          {state?.length > 0 &&
            state?.map((item) => <SearchPageItem data={item} key={item.id} />)}
        </div>
        <div>
          <Pagination
            data={state}
            onChange={(page) => handlePageChange(page)}
            itemsPerPage={itemsPerPage}
            count={count}
            page={page}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogSavedContent;
