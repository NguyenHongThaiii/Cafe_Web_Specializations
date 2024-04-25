import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

NotFoundItem.propTypes = {
  keyParams: PropTypes.string,
};

function NotFoundItem({ keyParams = "" }) {
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="flex items-center justify-center flex-col">
        <img src="/img/empty_menu.svg" alt="empty-item" className="w-[180px]" />
        <p className="md:text-[16px] text-[10px] mt-4">
          Rất tiếc, chúng tôi không tìm thấy kết quả với từ khóa {keyParams}
        </p>
        <p className="md:text-[16px] text-[10px] mt-1">
          Liệu Toidicafe.vn có đang bỏ lỡ quán cafe nào không?
          <Link
            to="/add-place"
            className="text-primary ml-1 font-semibold hover:underline cursor-pointer "
          >
            Hãy cho chúng tôi biết
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NotFoundItem;
