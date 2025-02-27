import { useQuery } from "@tanstack/react-query";
import { getRandomMeal } from "@/services/mealService";

export const useRandomMeal = () => {
  return useQuery({
    queryKey: ["randomMeal"],
    queryFn: getRandomMeal,
    enabled: false,
    staleTime: 0,
  });
};
