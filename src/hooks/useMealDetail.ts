import { useQuery } from "@tanstack/react-query";
import { getMealById } from "@/services/mealService";

export const useMealDetail = (id: string) => {
  return useQuery({
    queryKey: ["meal", id],
    queryFn: () => getMealById(id),
    staleTime: 30 * 60 * 1000,
    enabled: !!id,
  });
};