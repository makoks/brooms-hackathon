import React, {useState} from 'react';
import {Button, Layout} from 'antd';
import {ContentHeader} from '../components';
import EmployeesTable from "../components/Characters/EmployeesTable";
import CreateCharacterModal from "../components/Characters/CreateCharacterModal/CreateCharacterModal";

export const Home = ({compareList, addPersonInCompareList, removePersonFromCompareList}) => {
	const [employees] = useState([
		{
			id: 1,
			avatar: 'https://random.imagecdn.app/40/40',
			name: 'Иванов Иван Иванович',
			email: 'mail@mail.ru',
			phone: '88005553535',
			department: 'ОР',
			post: 'Ведущий эксперт',
			role: 'Разработчик',
			project: 'ДСУД ПОИ'
		},
		{
			id: 2,
			avatar: 'https://random.imagecdn.app/40/40',
			name: 'Петров Петр Петрович',
			email: 'petr@mail.ru',
			phone: '81234567890',
			department: 'ОД',
			post: 'Эксперт 1 категории',
			role: 'Технический писатель',
			project: 'АС ППА'
		},
		{
			id: 3,
			avatar: 'https://random.imagecdn.app/40/40',
			name: 'Сотрудников Сотрудник Сотрудникович',
			email: 'mail@mail.ru',
			phone: '88005553535',
			department: 'ОР',
			post: 'Ведущий эксперт',
			role: 'Системный аналитик',
			project: 'ДСУД ПОИ'
		},
		{
			id: 4,
			avatar: 'https://random.imagecdn.app/40/40',
			name: 'Разработчиков Разработчик Разработчикович',
			email: 'petr@mail.ru',
			phone: '81234567890',
			department: 'ОД',
			post: 'Эксперт 1 категории',
			role: 'Технический писатель',
			project: 'АС ППА'
		},
	])
	const [deletingIds] = useState([])
	const [creatingHero] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<Layout>
			<ContentHeader title='Сотрудники'/>
			<Layout.Content style={{margin: '27px 34px'}}>
				<Button
					onClick={showModal}
					type="primary"
					style={{marginBottom: 16}}
				>
					Добавить сотрудника
				</Button>
				<EmployeesTable
					employees={employees}
					compareList={compareList}
					addInCompareList={addPersonInCompareList}
					removeFromCompareList={removePersonFromCompareList}
					deleteHero={undefined}
					deletingIds={deletingIds}
				/>
				<CreateCharacterModal
					isModalVisible={isModalVisible}
					createCharacter={undefined}
					onCancel={handleCancel}
					loading={creatingHero}
				/>
			</Layout.Content>
		</Layout>
	);
};
