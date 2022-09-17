import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

const Text = ({ section, element }) => {
    const { dictionary } = useContext(LanguageContext);
    if(section !== undefined && element !== undefined) {
        return dictionary[section][element];
    }
    else return "";
};

export default Text;