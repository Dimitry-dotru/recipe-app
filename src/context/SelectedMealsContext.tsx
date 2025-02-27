"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Ingredient, ProcessedMeal } from "@/types";
import { combineIngredients } from "@/services/mealService";

interface SelectedMealsContextType {
  selectedMeals: Map<string, ProcessedMeal>;
  totalIngredients: Ingredient[];
  addMeal: (meal: ProcessedMeal) => void;
  removeMeal: (mealId: string) => void;
  clearMeals: () => void;
  isMealSelected: (mealId: string) => boolean;
  getSelectedCount: () => number;
}

const SelectedMealsContext = createContext<SelectedMealsContextType | undefined>(undefined);

export const useSelectedMeals = () => {
  const context = useContext(SelectedMealsContext);
  if (!context) {
    throw new Error("useSelectedMeals must be used within a SelectedMealsProvider");
  }
  return context;
};

interface SelectedMealsProviderProps {
  children: ReactNode;
}

export const SelectedMealsProvider: React.FC<SelectedMealsProviderProps> = ({ children }) => {
  const [selectedMeals, setSelectedMeals] = useState<Map<string, ProcessedMeal>>(new Map());
  const [totalIngredients, setTotalIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const meals = Array.from(selectedMeals.values());
    setTotalIngredients(combineIngredients(meals));
  }, [selectedMeals]);

  useEffect(() => {
    const loadSelectedMeals = () => {
      try {
        const savedMeals = localStorage.getItem("selectedMeals");
        if (savedMeals) {
          const parsedMeals = JSON.parse(savedMeals) as ProcessedMeal[];
          const mealsMap = new Map<string, ProcessedMeal>();
          parsedMeals.forEach(meal => {
            mealsMap.set(meal.idMeal, meal);
          });
          setSelectedMeals(mealsMap);
        }
      } catch (error) {
        console.error("Error loading selected meals from localStorage:", error);
      }
    };

    loadSelectedMeals();
  }, []);

  useEffect(() => {
    const saveMeals = () => {
      try {
        const mealsArray = Array.from(selectedMeals.values());
        localStorage.setItem("selectedMeals", JSON.stringify(mealsArray));
      } catch (error) {
        console.error("Error saving selected meals to localStorage:", error);
      }
    };

    saveMeals();
  }, [selectedMeals]);

  const addMeal = (meal: ProcessedMeal) => {
    setSelectedMeals(prev => {
      const newMap = new Map(prev);
      newMap.set(meal.idMeal, meal);
      return newMap;
    });
  };

  const removeMeal = (mealId: string) => {
    setSelectedMeals(prev => {
      const newMap = new Map(prev);
      newMap.delete(mealId);
      return newMap;
    });
  };

  const clearMeals = () => {
    setSelectedMeals(new Map());
  };

  const isMealSelected = (mealId: string) => {
    return selectedMeals.has(mealId);
  };

  const getSelectedCount = () => {
    return selectedMeals.size;
  };

  const value = {
    selectedMeals,
    totalIngredients,
    addMeal,
    removeMeal,
    clearMeals,
    isMealSelected,
    getSelectedCount,
  };

  return (
    <SelectedMealsContext.Provider value={value}>
      {children}
    </SelectedMealsContext.Provider>
  );
};