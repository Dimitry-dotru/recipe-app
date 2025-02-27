"use client";

import React from "react";
import { useSearch } from "@/hooks/useSearch";

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialValue = "",
  placeholder = "Receipts search...",
}) => {
  const { searchTerm, handleSearchChange, resetSearch } = useSearch({
    initialValue,
    onSearch,
  });

  return (
    <div className="relative w-full md:max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="w-full block px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      {searchTerm && (
        <button
          onClick={resetSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};