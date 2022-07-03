import {Avatar, Button, Table, Typography} from 'antd';
import {NavLink} from "react-router-dom";
import React, {useState, useEffect} from "react";
import ToCompareButton from "./ToCompareButton/ToCompareButton";
import {DeleteOutlined} from "@ant-design/icons";

export const CharactersTable = ({
	                                compareList,
	                                addInCompareList,
	                                removeFromCompareList,
	                                deleteHero,
	                                deletingIds,
	                                ...props
                                }) => {
	const [characters, setCharacters] = useState(props.characters ?? [])

	useEffect(() => {
		setCharacters(props.characters.map(character => ({...character, key: character.id,})))
	}, [props.characters, compareList])

	const columns = [
		{
			title: 'Аватар',
			dataIndex: 'avatarHero',
			key: 'avatarHero',
			render: (_, {avatarHero}) => <Avatar size='large' src={avatarHero}/>
		},
		{
			title: 'Никнейм',
			dataIndex: 'nickname',
			key: 'nickname',
			render: (_, {id, heroName}) => <NavLink to={`hero/${id}`}>{heroName}</NavLink>,
		},
		{
			title: 'Раса',
			dataIndex: 'heroRace',
			key: 'heroRace',
			render: (_, {heroRace: {raceName}}) => raceName
		},
		{
			title: 'Класс',
			dataIndex: 'heroClass.nameClass',
			key: 'heroClass.nameClass',
			render: (_, {heroClass: {nameClass}}) => nameClass
		},
		{
			title: 'Гильдия',
			dataIndex: 'heroGuild.nameGuild',
			key: 'heroGuild.nameGuild',
			render: (_, {heroGuild: {nameGuild}}) => nameGuild
		},
		{
			title: '',
			dataIndex: 'compare',
			key: 'compare',
			render: (_, {id}) => <ToCompareButton
				inCompareList={compareList?.includes(id)}
				onAdd={() => addInCompareList(id)}
				onRemove={() => removeFromCompareList(id)}
				disabled={compareList.length === 6}
			/>,
			width: '8%'
		},
		{
			title: '',
			dataIndex: 'remove',
			key: 'remove',
			render: (_, {id}) => <Button onClick={() => deleteHero(id)}
			                             loading={deletingIds.indexOf(id) !== -1}><DeleteOutlined/></Button>,
			width: '5%'
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