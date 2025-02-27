"use client";

import React from "react";
import { useCategories } from "@/hooks/useCategories";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return <div className="py-2">Categories loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-2 my-4">
      <button
        onClick={() => onSelectCategory("")}
        className={`px-4 py-2 rounded-full text-sm ${selectedCategory === ""
            ? "bg-orange-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
          }`}
      >
        Все
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm ${selectedCategory === category
              ? "bg-orange-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};