import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { searchMeals } from "@/services/mealService";

interface UseMealsProps {
  initialSearch?: string;
  itemsPerPage?: number;
}

export const useMeals = ({
  initialSearch = "",
  itemsPerPage = 10,
}: UseMealsProps = {}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meals", search],
    queryFn: () => searchMeals(search),
    staleTime: 5 * 60 * 1000,
  });

  const filteredMeals = useMemo(() => {
    if (!meals) return [];
    if (!selectedCategory) return meals;
    return meals.filter((meal) => meal.strCategory === selectedCategory);
  }, [meals, selectedCategory]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredMeals.length / itemsPerPage);
  }, [filteredMeals, itemsPerPage]);

  const paginatedMeals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMeals.slice(startIndex, endIndex);
  }, [filteredMeals, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return {
    meals: paginatedMeals,
    allMeals: meals || [],
    isLoading,
    error,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    totalPages,
    goToPage,
    pageNumbers: getPageNumbers(),
  };
};
