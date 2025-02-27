"use client";

import React from "react";
import { ProcessedMeal } from "@/types";
import { MealCard } from "./MealCard";
import { Loader } from "@/components/ui/Loader";

interface MealListProps {
  meals: ProcessedMeal[];
  isLoading: boolean;
  error: Error | null;
}

export const MealList: React.FC<MealListProps> = ({ meals, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-2">Error while loading receipts:</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Receipts not found. Try to change search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
};