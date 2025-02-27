"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageNumbers: (number | string)[];
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageNumbers,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-2 my-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        ←
      </button>

      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === "number" ? (
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${currentPage === page
                  ? "bg-orange-500 text-white"
                  : "border hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          ) : (
            <span className="px-2">...</span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
};