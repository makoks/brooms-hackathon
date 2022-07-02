import React, {useEffect, useState} from 'react';
import {Button, Layout, Select, Space, Switch, Typography} from 'antd';
import {ContentHeader} from '../components';
import {useParams} from "react-router-dom";
import {API} from "../API";
import HeroMainInfo from "../components/Characters/CharacterPage/HeroMainInfo";

const {Option} = Select

export const HeroPropertiesChanging = () => {
	const {id} = useParams()
	const [loading, setLoading] = useState(false)
	const [character, setCharacter] = useState(undefined)
	const [editableClusters, setEditableClusters] = useState(undefined)
	const [reason, setReason] = useState('levelUp')
	const [isEdit, setIsEdit] = useState(false)

	const saveChanges = () => {
		setCharacter({
			...character,
			clusters: [...editableClusters]
		})
		toggleIsEdit()
	}

	const discardChanges = () => {
		setEditableClusters([...character.clusters])
		toggleIsEdit()
	}

	// const changeClusterField = (clusterName, fieldName, newValue) => {
	// 	const newClusters = editableClusters.map(cluster => (
	// 		cluster.name === clusterName
	// 			? {
	// 				...cluster,
	// 				items: cluster.items.map(item => (
	// 					item.name === fieldName
	// 						? {...item, value: newValue}
	// 						: item
	// 				))
	// 			}
	// 			: cluster
	// 	))
	// 	setEditableClusters(newClusters)
	// }

	const toggleIsEdit = () => {
		setIsEdit(!isEdit)
	}

	useEffect(() => {
		const getCharacter = async (id) => {
			const response = await API.getHero(id)
			setCharacter(response.data)
			setEditableClusters(response.data.clusters)
		}
		setLoading(true)
		getCharacter(id)
			.finally(() => setLoading(false))
	}, [id])

	return (
		<Layout>
			<ContentHeader title='Персонаж' paddingBottom={true}>
				<HeroMainInfo
					loading={loading}
					avatar={character?.avatarHero}
					nickname={character?.heroName}
					about={character?.about}
					registerDate={new Date(character?.dateReg)}
					race={character?._embedded.heroRace.raceName}
					heroClass={character?._embedded.heroClass.nameClass}
					guild={character?._embedded.heroGuild.nameGuild}
				/>
				<Space>
					Редактировать:
					<Switch
						checkedChildren="Вкл"
						unCheckedChildren="Выкл"
						checked={isEdit}
						onChange={toggleIsEdit}
					/>
				</Space>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				{isEdit && (
					<div>
						<Typography.Text>Причина изменения: </Typography.Text>
						<Select
							onChange={setReason}
							value={reason}
							style={{minWidth: 300, marginBottom: 16}}
						>
							<Option value="levelUp">Повышение уровня</Option>
							<Option value="levelDown">Понижение уровня</Option>
							<Option value="lootBuy">Покупка лута</Option>
							<Option value="enterGame">Вход в игру</Option>
							<Option value="exitGame">Выход из игры</Option>
						</Select>
					</div>
				)}
				{/*<ClustersList*/}
				{/*	clusters={character?.clusters ?? []}*/}
				{/*	editableClusters={editableClusters}*/}
				{/*	changeClusterField={changeClusterField}*/}
				{/*	isEdit={isEdit}*/}
				{/*/>*/}
				{isEdit && (
					<Space style={{marginTop: 16, marginLeft: 'auto'}}>
						<Button onClick={saveChanges} type='primary'>Сохранить изменения</Button>
						<Button onClick={discardChanges}>Отменить</Button>
					</Space>
				)}
			</Layout.Content>
		</Layout>
	);
};
