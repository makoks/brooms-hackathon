import React, {createContext, useState} from 'react'

export const CompareListContext = createContext({
	compareList: [],
	addToCompareList: () => {
	},
	removeFromCompareList: () => {
	},
	removeFromCompareListByIndex: () => {
	}
})

export const CompareListProvider = ({children}) => {
	const [compareList, setCompareList] = useState(JSON.parse(localStorage.getItem('compareList')) ?? [])

	const addToCompareList = (id) => {
		const newList = [...compareList, id]
		setCompareList(newList)
		localStorage.setItem('compareList', JSON.stringify(newList))
	}

	const removeFromCompareList = (id) => {
		const newList = compareList.filter(itemId => itemId !== id)
		setCompareList(newList)
		localStorage.setItem('compareList', JSON.stringify(newList))
	}

	const removeFromCompareListByIndex = (index) => {
		const newList = [...compareList]
		newList.splice(index, 1)
		setCompareList(newList)
		localStorage.setItem('compareList', JSON.stringify(newList))
	}

	return (
		<CompareListContext.Provider
			value={{compareList, addToCompareList, removeFromCompareList, removeFromCompareListByIndex}}>
			{children}
		</CompareListContext.Provider>
	)
}