import React, {createContext, useState} from 'react';

type CompareListContextType = {
    compareList: string[];
    addToCompareList: (id: string) => void;
    removeFromCompareList: (id: string) => void;
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
    const [compareList, setCompareList] = useState<string[]>(JSON.parse(localStorage.getItem('compareList') ?? '') ?? []);

    const addToCompareList = (id: string) => {
        const newList = [...compareList, id];
        setCompareList(newList);
        localStorage.setItem('compareList', JSON.stringify(newList));
    };

    const removeFromCompareList = (id: string) => {
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
            value={{compareList, addToCompareList, removeFromCompareList, removeFromCompareListByIndex}}>
            {children}
        </CompareListContext.Provider>
    )
}