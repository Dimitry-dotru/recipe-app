"use client";

import React, { useState, useCallback } from "react";
import { useMeals } from "@/hooks/useMeals";
import { SearchBar } from "@/components/ui/SearchBar";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { Pagination } from "@/components/ui/Pagination";
import { MealList } from "@/components/meals/MealList";

export default function HomePage() {
  const [searchQuery] = useState("");
  const {
    meals,
    isLoading,
    error,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    totalPages,
    goToPage,
    pageNumbers,
  } = useMeals({ itemsPerPage: 12 });

  const handleSearch = useCallback((term: string) => {
    setSearch(term);
  }, [setSearch]);

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Find your favourite receipt!</h1>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <SearchBar
            onSearch={handleSearch}
            initialValue={searchQuery}
            placeholder="Receipts search (for example, pasta, chicken, soup...)"
          />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      <section>
        <MealList
          meals={meals}
          isLoading={isLoading}
          error={error}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          pageNumbers={pageNumbers}
        />
      </section>
    </div>
  );
}