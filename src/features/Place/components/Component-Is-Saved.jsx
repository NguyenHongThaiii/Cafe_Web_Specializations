import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { MdSaveAlt } from "react-icons/md";
import blogSavedApi from "../../../api/blog-savedApi";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";

ComponentIsSaved.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
};

function ComponentIsSaved({ data = {}, user = {} }) {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [filters, setFilters] = useState({
    userId: user?.id,
    productId: data?.id,
  });
  useEffect(() => {
    (async () => {
      if (user?.id && data?.id) {
        const isSave = await blogSavedApi.checkBlogIsSavedByUserId({
          ...filters,
          userId: user?.id,
          productId: data?.id,
        });
        setIsSaved(isSave);
      }
    })();
  }, [filters, data]);
  const handleSaveBlogs = async () => {
    try {
      if (!user?.id) {
        dispatch(showLoginPage());
        return;
      }
      await blogSavedApi.toggleBlogSaved({
        productId: data?.id,
        userId: user?.id,
      });
      setFilters((prev) => ({ ...prev }));
      if (isSaved) toast(`Đã hủy lưu thành công cafe ${data?.name}`);
      else toast(`Đã lưu thành công cafe ${data?.name}`);
    } catch (error) {
      if (isSaved) toast(`Có lỗi hủy lưu cafe ${data?.name}`);
      else toast(`Có lỗi lưu cafe ${data?.name}`);
    }
  };

  return (
    <div
      onClick={handleSaveBlogs}
      className="w-9 h-8 flex items-center justify-center"
    >
      <MdSaveAlt
        className={`w-[100%] h-[26px] text-sm m-0 cursor-pointer
  ${isSaved ? "text-primary" : "text-secondary"}
  `}
      />
    </div>
  );
}

export default ComponentIsSaved;
