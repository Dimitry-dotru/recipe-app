export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  // Ingredient (20 is max)
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  // Measure (20 max)
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
}

// Api response with Meal list
export interface MealsResponse {
  meals: Meal[] | null;
}

// Ingredient after proccessed
export interface Ingredient {
  name: string;
  measure: string;
}

// Receipt with proccessed ingredients
export interface ProcessedMeal
  extends Omit<Meal, `strIngredient${number}` | `strMeasure${number}`> {
  ingredients: Ingredient[];
}

// Filters
export interface FilterOptions {
  category: string;
  page: number;
  search: string;
}

// Pagination
export interface Pagination {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

// Type for selected meals
export interface SelectedMeals {
  meals: Map<string, ProcessedMeal>; // idMeal -> ProcessedMeal
  totalIngredients: Ingredient[];
}

// Category
export interface Category {
  strCategory: string;
}

// Category response
export interface CategoriesResponse {
  categories: Category[];
}
