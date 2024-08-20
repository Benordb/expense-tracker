"use client";
import { createContext, useState, useContext } from "react";

export const Context = createContext(null);
export const ContextProvider = ({ children }) => {
  // const memoizedValue = useMemo((value) => {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   setIsLoggedIn(value)
  //   return isLoggedIn
  // }, [])
  const [categories, setCategories] = useState([]);
  const [chooseCategories, setChooseCategories] = useState([]);
  const [records, setRecords] = useState([]);
  const [recordCheck, setRecordCheck] = useState([]);
  const [recordType, setRecordType] = useState("all");
  const [user, setUser] = useState({});
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        records,
        setRecords,
        setRecordType,
        recordType,
        categories,
        setCategories,
        chooseCategories,
        setChooseCategories,
        recordCheck,
        setRecordCheck,
        // memoizedValue,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useContexts = () => useContext(Context)