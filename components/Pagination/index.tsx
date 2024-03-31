// components/Pagination/index.tsx

import React from "react";

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
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
