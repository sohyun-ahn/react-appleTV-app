import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number): string => {
  // Update debouncedValue after delay
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    // timeout 호출도중에 value나 delay가 바뀌어서 다시 호출되면 clearTimeout으로 없애준다.
    return () => {
      clearInterval(handler);
    };
  }, [value, delay]); // only recall effect if value or delay changes

  return debouncedValue;
};

export default useDebounce;
