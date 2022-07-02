import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import {ContentHeader} from '../components';
import CharactersTable from "../components/Characters/CharactersTable";
import {API} from "../API";

export const Home = () => {
	const [characters, setCharacters] = useState([])
	const [compareList, setCompareList] = useState(JSON.parse(localStorage.getItem('compareList')) ?? [])

	const addInCompareList = (id) => {
		const newList = [...compareList, id]
		setCompareList(newList)
		localStorage.setItem('compareList', JSON.stringify(newList))
	}

	const removeFromCompareList = (id) => {
		const newList = compareList.filter(itemId => itemId !== id)
		setCompareList(newList)
		localStorage.setItem('compareList', JSON.stringify(newList))
	}

	// initial set characters
	useEffect(() => {
		const getCharacters = async () => {
			const data = await API.characters()
			setCharacters(data)
		}

		getCharacters()
	}, [])

	return (
		<Layout>
			<ContentHeader title='Персонажи'/>
			<Layout.Content style={{margin: '27px 34px'}}>
				<CharactersTable
					characters={characters}
					compareList={compareList}
					addInCompareList={addInCompareList}
					removeFromCompareList={removeFromCompareList}
				/>
			</Layout.Content>
		</Layout>
	);
};
