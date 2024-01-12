import { useState, useEffect } from "react";
import { CountStateI } from "./zustand";

const useStore = (store, callback: (state: CountStateI) => number) => {
  const result: number = store(callback);
  const [data, setData] = useState<number>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;
