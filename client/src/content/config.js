import { useEffect, useState } from "react";
import Storage from "../constants/storage";
import localStorageHelper from "../helpers/localStorageHelper";
import en from './locale/en.json';
import mk from './locale/mk.json';

export const dictionaryList = { mk, en };

export const languageOptions = {
    mk: "Македонски",
    en: "English",
}


