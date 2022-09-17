import { createContext, useEffect, useMemo, useState } from "react";
import Storage from "../constants/storage";
import MK from "../content/locale/mk";
import EN from '../content/locale/en';
import localStorageHelper from "../helpers/localStorageHelper";

import { languageOptions, dictionaryList } from "../content/config";


export const LanguageContext = createContext({
    userLanguage: "mk",
    dictionary: dictionaryList.mk,
})

export const LanguageContextProvider = ({ children }) => {
    const [userLanguage, setUserLanguage] = useState(localStorageHelper.getItem(Storage.LANGUAGE ) || 'mk');

    const handleLanguageChange = () => {
        setUserLanguage(prevState => prevState === "mk" ? "en" : "mk");
    }

    useEffect(() => {
        localStorageHelper.saveItem(Storage.LANGUAGE, userLanguage);
    },[userLanguage])

    const provider = {
        userLanguage,
        dictionary: dictionaryList[userLanguage],
        handleLanguageChange,
    }

    return (
        <LanguageContext.Provider value={provider}>
            {children}
        </LanguageContext.Provider>)
}