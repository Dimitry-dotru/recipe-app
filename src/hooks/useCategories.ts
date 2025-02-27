import { getCategories } from "@/services/mealService";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
