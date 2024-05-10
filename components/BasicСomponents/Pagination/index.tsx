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
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  // Если всего страниц меньше или равно 5, показываем все страницы
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Если страниц больше 5, скрываем некоторые страницы
    if (currentPage <= 3) {
      // Показываем первые 3 страницы, затем "..."
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Показываем последние 3 страницы, предварительно "..."
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Показываем текущую страницу и страницы до и после нее, предварительно "..."
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
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
        {pageNumbers.map((number, index) => (
          <button
            key={index} // Используем индекс вместо числа как ключ, чтобы избежать предупреждения React
            onClick={() => {
              if (number !== "...") {
                paginate(number as number);
              }
            }}
            className={currentPage === number ? "active" : "inactive"}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="next-page"
      >
        <Image className="icon" src={iconObj.paginationUp} width={24} height={24} alt="Next page" />
      </button>
    </div>
  );
};

export default Pagination;
