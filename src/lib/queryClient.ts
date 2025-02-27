// src/lib/queryClient.ts
"use client";

import { QueryClient } from "@tanstack/react-query";

// Создаем экземпляр QueryClient с настройками
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут по умолчанию
      gcTime: 10 * 60 * 1000, // 10 минут до сборки мусора
      retry: 1, // Одна повторная попытка при ошибке
      refetchOnWindowFocus: false, // Не обновлять данные при фокусе окна
    },
  },
});
