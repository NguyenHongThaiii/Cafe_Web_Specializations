import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  total_pages: PropTypes.number,
  onChange: PropTypes.func,
};

function Pagination({ itemsPerPage, data, onChange, count }) {
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    setPageCount(() => {
      return Math.ceil(count / itemsPerPage);
    });
  }, [data]);

  const handlePageClick = (event) => {
    if (!onChange) return;
    onChange(1 + event.selected);
  };
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      activeClassName="active"
    />
  );
}

export default Pagination;
