"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMeals } from "@/hooks/useMeals";
import { useRandomMeal } from "@/hooks/useRandomMeal";
import { SearchBar } from "@/components/ui/SearchBar";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { Pagination } from "@/components/ui/Pagination";
import { MealList } from "@/components/meals/MealList";
import { Button } from "@/components/ui/Button";
import { useSelectedMeals } from "@/context/SelectedMealsContext";

export default function HomePage() {
  const router = useRouter();
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

  const { refetch: fetchRandomMeal, isLoading: isLoadingRandom } = useRandomMeal();
  const { selectedMeals } = useSelectedMeals();

  const handleSearch = useCallback((term: string) => {
    setSearch(term);
  }, [setSearch]);

  const handleRandomMeal = async () => {
    const { data: randomMeal } = await fetchRandomMeal();
    if (randomMeal) {
      router.push(`/recipe/${randomMeal.idMeal}`);
    }
  };

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Find your favorite recipe</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search recipes (pasta, chicken, soup...)"
          />
          <Button
            onClick={handleRandomMeal}
            variant="secondary"
            disabled={isLoadingRandom}
          >
            {isLoadingRandom ? "Loading..." : "I'm Feeling Lucky"}
          </Button>
          {!!selectedMeals.size && (
            <Button
              className="md:ml-auto"
              onClick={() => router.push("/selected")}
              variant="primary"
            >
              View Selected Recipes
            </Button>
          )}
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