"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProcessedMeal } from "@/types";
import { useSelectedMeals } from "@/context/SelectedMealsContext";
import { Button } from "@/components/ui/Button";

interface MealCardProps {
  meal: ProcessedMeal;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const { addMeal, removeMeal, isMealSelected } = useSelectedMeals();
  const isSelected = isMealSelected(meal.idMeal);

  const handleToggleSelect = () => {
    if (isSelected) {
      removeMeal(meal.idMeal);
    } else {
      addMeal(meal);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/recipe/${meal.idMeal}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{meal.strMeal}</h3>
          <div className="flex flex-wrap justify-between items-center">
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {meal.strCategory}
            </span>
            <span className="text-gray-600 text-sm">
              {meal.strArea}
            </span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button
          onClick={handleToggleSelect}
          variant={isSelected ? "outline" : "primary"}
          size="sm"
          className="w-full"
        >
          {isSelected ? "Remove from selected" : "Add to selected"}
        </Button>
      </div>
    </div>
  );
};