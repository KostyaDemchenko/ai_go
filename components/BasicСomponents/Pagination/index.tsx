// components/Pagination/index.tsx

import React from "react";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="prev-page"
      >
        <Image
          className="icon"
          src={iconObj.paginationBack}
          width={24}
          height={24}
          alt="Previous page"
        />
      </button>
      <div className="page-list">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? "active" : "inactive"}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        className="next-page"
      >
        <Image
          className="icon"
          src={iconObj.paginationUp}
          width={24}
          height={24}
          alt="Previous page"
        />
      </button>
    </div>
  );
};

export default Pagination;
