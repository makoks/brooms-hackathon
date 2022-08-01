import React, {useEffect, useState} from 'react';
import {Button, Layout, message} from 'antd';
import {ContentHeader} from '../components';
import CharactersTable from "../components/Characters/CharactersTable";
import {API} from "../API";
import CreateCharacterModal from "../components/Characters/CreateCharacterModal/CreateCharacterModal";

export const Home = ({compareList, addPersonInCompareList, removePersonFromCompareList}) => {
	const [characters, setCharacters] = useState([])
	const [deletingIds, setDeletingIds] = useState([])
	const [creatingHero, setCreatingHero] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const createCharacter = async (heroData) => {
		setCreatingHero(true)
		API.createHero(heroData)
			.then(() => {
				message.success('Герой успешно создан')
				getCharacters()
				closeModal()

			})
			.catch(() => message.error('Что-то пошло не так :('))
			.finally(() => setCreatingHero(false))
	}

	const showModal = () => {
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const deleteHero = (id) => {
		setDeletingIds([...deletingIds, id])
		API.deleteHero(id)
			.then (() => {
				removeFromCharacters(id)
				removePersonFromCompareList(id)
				message.success('Герой успешно удален')
			})
			.catch(() => message.error('Что-то пошло не так :('))
			.finally(() => setDeletingIds(deletingIds.filter(i => i !== id)))
	}

	const removeFromCharacters = (id) => {
		setCharacters(characters.filter(character => character.id !== id))
	}

	const getCharacters = () => {
		const get = async () => {
			const response = await API.getHeroes()
			setCharacters(response.data._embedded.hero)
		}

		get()
	}

	// initial set characters
	useEffect(getCharacters, [])

	return (
		<Layout>
			<ContentHeader title='Персонажи'/>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Button
					onClick={showModal}
					type="primary"
					style={{
						marginBottom: 16,
					}}
				>
					Добавить персонажа
				</Button>
				<CharactersTable
					characters={characters}
					compareList={compareList}
					addInCompareList={addPersonInCompareList}
					removeFromCompareList={removePersonFromCompareList}
					deleteHero={deleteHero}
					deletingIds={deletingIds}
				/>
				<CreateCharacterModal
					isModalVisible={isModalVisible}
					createCharacter={createCharacter}
					onCancel={handleCancel}
					loading={creatingHero}
				/>
			</Layout.Content>
		</Layout>
	);
};
