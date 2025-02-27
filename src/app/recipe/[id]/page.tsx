"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useMealDetail } from "@/hooks/useMealDetail";
import { useSelectedMeals } from "@/context/SelectedMealsContext";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";

export default function RecipePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: meal, isLoading, error } = useMealDetail(params.id);
  const { addMeal, removeMeal, isMealSelected, selectedMeals } = useSelectedMeals();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          {error ? `Error: ${error.message}` : "Recipe not found"}
        </h1>
        <Button onClick={() => router.push("/")} variant="primary">
          Back to Recipes
        </Button>
      </div>
    );
  }

  const isSelected = isMealSelected(meal.idMeal);

  const handleToggleSelect = () => {
    if (isSelected) {
      removeMeal(meal.idMeal);
    } else {
      addMeal(meal);
    }
  };

  const instructionsParagraphs = meal.strInstructions
    .split(/\r\n|\n\n|\r/)
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6 flex justify-between">
        <Button onClick={() => router.back()} variant="outline">
          ← Back
        </Button>
        {!!selectedMeals.size && (
          <Button
            onClick={() => router.push("/selected")}
            variant="secondary"
          >
            View Selected Recipes
          </Button>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative h-96 w-full">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {meal.strCategory}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {meal.strArea}
                </span>
                {meal.strTags &&
                  meal.strTags.split(",").map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleToggleSelect}
                  variant={isSelected ? "outline" : "primary"}
                >
                  {isSelected ? "Remove from Selection" : "Add to Selection"}
                </Button>

                {meal.strYoutube && (
                  <Button
                    onClick={() => window.open(meal.strYoutube, "_blank")}
                    variant="secondary"
                  >
                    Watch on YouTube
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-6">{meal.strMeal}</h1>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
              <ul className="space-y-2">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-6 h-6 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="ml-2 text-gray-600">
                      {ingredient.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Instructions</h2>
              <div className="space-y-4">
                {instructionsParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {meal.strSource && (
              <div className="mt-6">
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-700"
                >
                  View Original Recipe
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}