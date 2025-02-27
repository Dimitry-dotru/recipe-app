import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";

interface UseSearchProps {
  initialValue?: string;
  delay?: number;
  onSearch?: (value: string) => void;
}

export const useSearch = ({
  initialValue = "",
  delay = 500,
  onSearch,
}: UseSearchProps = {}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm] = useDebounce(searchTerm, delay);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const resetSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    handleSearchChange,
    resetSearch,
  };
};
