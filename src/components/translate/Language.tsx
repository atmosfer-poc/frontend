import React, { useState, createContext, useContext, useEffect } from "react";
import { languageOptions } from "../../services/languages";
import { ILov } from "@common/interfaces/lov";
import { useSelector } from "react-redux";
import { RootStore } from "@redux/store";

export const LanguageContext = createContext({
  userLanguage: "tr",
  dictionary: [] as ILov.Lov[],
  directoryChange: null as any,
  userLanguageChange: null as any,
});

export function LanguageProvider({ children }) {
  const defaultLanguage = window.localStorage.getItem("translation");
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || "en");
  const [dictionary, setDictionary] = useState<ILov.Lov[]>([]);

  const { data } = useSelector((state: RootStore) => state.translate);

  if (defaultLanguage === null || undefined) {
    window.localStorage.setItem("translation", "tr");
  }

  useEffect(() => {
    setDictionary(data);
  }, []);

  const directoryChange = (newDict: ILov.Lov[]) => {
    for (let lov of newDict) {
      if (lov.displayName === "parent-" + userLanguage) {
        setDictionary(lov.children);
      }
    }
  };

  const userLanguageChange = (selected) => {
    const newLanguage = languageOptions[selected] ? selected : "tr";
    setUserLanguage(newLanguage);
    window.localStorage.setItem("translation", newLanguage);
  };

  return (
    <>
      {dictionary.length > 0 && (
        <LanguageContext.Provider
          value={{
            userLanguage,
            dictionary,
            userLanguageChange,
            directoryChange,
          }}
        >
          {dictionary.length > 0 && children}
        </LanguageContext.Provider>
      )}
    </>
  );
}

export function Translate({ tid, defaultValue }) {
  return <span>{getTranslateValue(tid, defaultValue)}</span>;
}

export function getTranslateValue(tid, defaultValue) {
  let languageSelection = localStorage.getItem("LANGUAGE");
  if (!languageSelection) {
    languageSelection = "tr";
  }
  let dictionaryStr = localStorage.getItem(languageSelection);
  if (!dictionaryStr) {
    dictionaryStr = "[]";
  }
  const dictionary = JSON.parse(dictionaryStr) as any[];

  return (
    dictionary?.filter((d) => d.term === tid)?.[0]?.displayName || defaultValue
  );
}
