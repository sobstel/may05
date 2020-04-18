import { useEffect, useRef } from "react";

// source: https://usehooks.com/usePrevious/
export default function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  // return previous value (happens before update in useEffect above)
  return ref.current;
}
