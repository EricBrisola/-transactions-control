import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  const stopLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    stopLoading,
  };
};
