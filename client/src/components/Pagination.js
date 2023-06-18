import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { findAll } from "../slices/todo";

const Pagination = ({ totalPages, currentPage, totalItems, order_by }) => {
  const dispatch = useDispatch();
  useEffect(() => {}, [totalItems]);

  const handlePagination = (page) => {
    dispatch(findAll({ page: page - 1, order_by }));
  };

  const renderPages = () => {
    let pages = [];
    for (let p = 1; p <= totalPages; p++) {
      let style = p === currentPage + 1 ? "text-primary" : "";
      pages.push(
        <button
          key={p}
          className={`${style} border p-3 bg-white`}
          onClick={() => handlePagination(p)}
        >
          {p}
        </button>
      );
    }
    return pages;
  };

  return <div className="d-flex gap-3">{renderPages()}</div>;
};

export default Pagination;
