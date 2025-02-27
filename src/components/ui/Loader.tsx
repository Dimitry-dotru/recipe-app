import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "text-orange-500",
}) => {
  const sizeStyles = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeStyles[size]} ${color} animate-spin rounded-full border-2 border-solid border-current border-r-transparent`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};