import React, { createContext, useState } from 'react';
import { Id } from "../API/types";

type CompareListContextType = {
    compareList: Id[];
    addToCompareList: (id: Id) => void;
    removeFromCompareList: (id: Id) => void;
    removeFromCompareListByIndex: (index: number) => void;
};

export const CompareListContext = createContext<CompareListContextType>({
    compareList: [],
    addToCompareList: () => {
    },
    removeFromCompareList: () => {
    },
    removeFromCompareListByIndex: () => {
    }
});

type CompareListProviderProps = {
    children: React.ReactNode;
};

export const CompareListProvider: React.FC<CompareListProviderProps> = ({ children }) => {
    const [compareList, setCompareList] = useState<Id[]>(JSON.parse(localStorage.getItem('compareList') ?? '[]'));

    const addToCompareList = (id: Id) => {
        const newList = [...compareList, id];
        setCompareList(newList);
        localStorage.setItem('compareList', JSON.stringify(newList));
    };

    const removeFromCompareList = (id: Id) => {
        const newList = compareList.filter(itemId => itemId !== id);
        setCompareList(newList);
        localStorage.setItem('compareList', JSON.stringify(newList));
    };

    const removeFromCompareListByIndex = (index: number) => {
        const newList = [...compareList];
        newList.splice(index, 1);
        setCompareList(newList);
        localStorage.setItem('compareList', JSON.stringify(newList));
    };

    return (
        <CompareListContext.Provider
            value={{ compareList, addToCompareList, removeFromCompareList, removeFromCompareListByIndex }}>
            {children}
        </CompareListContext.Provider>
    )
}