import {Avatar, Table, Typography} from 'antd';
import {NavLink} from "react-router-dom";
import React, {useState, useEffect} from "react";
import ToCompareButton from "./ToCompareButton/ToCompareButton";

export const CharactersTable = ({compareList, addInCompareList, removeFromCompareList, ...props}) => {
	const [characters, setCharacters] = useState(props.characters ?? [])

	useEffect(() => {
		setCharacters(props.characters.map(character => (
			{
				...character,
				key: character.id,
				avatar: <Avatar size='large' src={character.avatar} />,
				compare: <ToCompareButton
					inCompareList={compareList?.includes(character.id)}
					onAdd={() => addInCompareList(character.id)}
					onRemove={() => removeFromCompareList(character.id)}
				/>
			}
		)))
	}, [props.characters, compareList])

	const columns = [
		{
			title: 'Аватар',
			dataIndex: 'avatar',
			key: 'avatar',
		},
		{
			title: 'Никнейм',
			dataIndex: 'nickname',
			key: 'nickname',
			render: (_, character) => <NavLink to={`character/${character.id}`}>{character.nickname}</NavLink>,
			sorter: (a, b) => a.nickname - b.nickname,
		},
		{
			title: 'Раса',
			dataIndex: 'race',
			key: 'race',
		},
		{
			title: 'Класс',
			dataIndex: 'class',
			key: 'class',
		},
		{
			title: 'Гильдия',
			dataIndex: 'guild',
			key: 'guild',
		},
		{
			title: 'Сравнение',
			dataIndex: 'compare',
			key: 'compare',
			width: '10%'
		},
	]

	return (
		<Table
			columns={columns}
			dataSource={characters}
			expandable={{
				expandedRowRender: (record) => (
					<Typography.Paragraph style={{margin: 0}}>{record.about}</Typography.Paragraph>
				),
			}}
		/>
	)
}

export default CharactersTable