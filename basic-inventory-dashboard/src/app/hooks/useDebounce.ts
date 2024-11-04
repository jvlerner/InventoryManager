import { useRef, useEffect } from "react";

type Timer = ReturnType<typeof setTimeout>;

// Função genérica de debounce
const useDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debouncedFunction = (...args: Parameters<T>) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  return debouncedFunction;
};

// Usando o useDebounce em useCategories e useProducts
import { useCategories } from "./useCategories";
import { useProducts } from "./useProducts";

export const useDebouncedCategories = (delay = 1000) => {
  const categoriesFunction = useCategories; // Assumindo que useCategories é uma função
  return useDebounce(categoriesFunction, delay);
};

export const useDebouncedProducts = (delay = 1000) => {
  const productsFunction = useProducts; // Assumindo que useProducts é uma função
  return useDebounce(productsFunction, delay);
};
