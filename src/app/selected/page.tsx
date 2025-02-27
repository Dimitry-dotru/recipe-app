"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelectedMeals } from "@/context/SelectedMealsContext";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function SelectedMealsPage() {
  const router = useRouter();
  const { selectedMeals, totalIngredients, removeMeal, clearMeals } = useSelectedMeals();
  const meals = Array.from(selectedMeals.values());

  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-semibold mb-4">No recipes selected yet</h2>
        <p className="text-gray-600 mb-6">
          Add some recipes to create your ingredients list
        </p>
        <Link href="/">
          <Button>Browse Recipes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4 items-center">
          <Button onClick={() => router.back()} variant="outline">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold">Selected Recipes ({meals.length})</h1>
        </div>
        <Button onClick={clearMeals} variant="danger">
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Combined Ingredients</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-2">
              {totalIngredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="text-gray-600 ml-2">({ingredient.measure})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Selected Recipes</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="divide-y">
              {meals.map((meal) => (
                <li key={meal.idMeal} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{meal.strMeal}</h3>
                      <p className="text-sm text-gray-500">
                        {meal.strCategory} • {meal.strArea}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/recipe/${meal.idMeal}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeMeal(meal.idMeal)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Instructions</h2>
        {meals.map((meal) => (
          <div key={meal.idMeal} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">{meal.strMeal}</h3>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Ingredients:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {meal.ingredients.map((ing, idx) => (
                  <li key={idx}>
                    {ing.name} ({ing.measure})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Instructions:</h4>
              <p className="text-gray-700">{meal.strInstructions}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}