/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import {
  MealsResponse,
  Meal,
  CategoriesResponse,
  ProcessedMeal,
  Ingredient,
} from "@/types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// function to proccess receipt and get ingridients in structure
export const processMeal = (meal: Meal): ProcessedMeal => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
    const measure = meal[`strMeasure${i}` as keyof Meal] as string;

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient,
        measure: measure || "",
      });
    }
  }

  const {
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20,
    ...mealData
  } = meal;

  return {
    ...mealData,
    ingredients,
  };
};

export const searchMeals = async (search: string): Promise<ProcessedMeal[]> => {
  try {
    const response = await axios.get<MealsResponse>(
      `${BASE_URL}/search.php?s=${search}`
    );

    if (!response.data.meals) {
      return [];
    }

    return response.data.meals.map(processMeal);
  } catch (error) {
    console.error("Error searching meals:", error);
    return [];
  }
};

export const getMealById = async (
  id: string
): Promise<ProcessedMeal | null> => {
  try {
    const response = await axios.get<MealsResponse>(
      `${BASE_URL}/lookup.php?i=${id}`
    );

    if (!response.data.meals || response.data.meals.length === 0) {
      return null;
    }

    return processMeal(response.data.meals[0]);
  } catch (error) {
    console.error("Error getting meal by ID:", error);
    return null;
  }
};

// get all categories
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get<CategoriesResponse>(
      `${BASE_URL}/categories.php`
    );

    if (!response.data.categories) {
      return [];
    }

    return response.data.categories.map((category) => category.strCategory);
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
};

// get random meal
export const getRandomMeal = async (): Promise<ProcessedMeal | null> => {
  try {
    const response = await axios.get<MealsResponse>(`${BASE_URL}/random.php`);

    if (!response.data.meals || response.data.meals.length === 0) {
      return null;
    }

    return processMeal(response.data.meals[0]);
  } catch (error) {
    console.error("Error getting random meal:", error);
    return null;
  }
};

// function to get meal by category
export const getMealsByCategory = async (
  category: string
): Promise<ProcessedMeal[]> => {
  try {
    const response = await axios.get<MealsResponse>(
      `${BASE_URL}/filter.php?c=${category}`
    );

    if (!response.data.meals) {
      return [];
    }

    const fullMeals = await Promise.all(
      response.data.meals.map(async (meal) => {
        const fullMeal = await getMealById(meal.idMeal);
        return fullMeal;
      })
    );

    return fullMeals.filter((meal): meal is ProcessedMeal => meal !== null);
  } catch (error) {
    console.error("Error getting meals by category:", error);
    return [];
  }
};

// combining ingridients from couple of receipts
export const combineIngredients = (meals: ProcessedMeal[]): Ingredient[] => {
  const ingredientMap = new Map<string, Ingredient>();

  meals.forEach((meal) => {
    meal.ingredients.forEach((ingredient) => {
      const key = ingredient.name.toLowerCase();

      if (ingredientMap.has(key)) {
        const existingIngredient = ingredientMap.get(key)!;
        ingredientMap.set(key, {
          name: ingredient.name,
          measure: `${existingIngredient.measure}, ${ingredient.measure}`,
        });
      } else {
        ingredientMap.set(key, {
          name: ingredient.name,
          measure: ingredient.measure,
        });
      }
    });
  });

  return Array.from(ingredientMap.values());
};
