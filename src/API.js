import axios from "axios";

const API_URL = 'http://176.119.147.104:8081/';
const config = {
	headers: {
		'content-type': 'application/json'
	}
}

export const API = {
	getCharacters: async () => {
		return axios.get(`${API_URL}hero`, config)
		// return [
		// 	{
		// 		id: '1',
		// 		nickname: 'Тестовый персонаж',
		// 		about: 'Тестовый персонаж без всякой предыстории и свойств)))',
		// 		avatar: 'https://picsum.photos/200',
		// 		registerDate: new Date('22-12-2001'),
		// 		race: 'Орк какой-то',
		// 		heroClass: 'Убийца',
		// 		guild: 'Нечистая сила'
		// 	},
		// 	{
		// 		id: '2',
		// 		nickname: 'Какой-то her0',
		// 		about: 'ее персонаж опять же без свойств',
		// 		avatar: 'https://picsum.photos/200',
		// 		registerDate: new Date('01-01-2022'),
		// 		race: 'Эльф',
		// 		heroClass: 'Лучник',
		// 		guild: 'Парикмахерская'
		// 	},
		// 	{
		// 		id: '3',
		// 		nickname: 'Бильбо',
		// 		about: 'Отправился воровать камень у дракона',
		// 		avatar: 'https://picsum.photos/200',
		// 		registerDate: new Date('02-02-2018'),
		// 		race: 'Хоббит',
		// 		heroClass: 'Вор',
		// 		guild: 'Садоводы'
		// 	},
		// ];
	},
	character: async (id) => {
		return axios.get(`${API_URL}hero/${id}`, config)
		// return await {
		// 	id: '1',
		// 	nickname: 'Тестовый персонаж',
		// 	about: 'Тестовый персонаж без всякой предыстории и свойств)))',
		// 	avatar: 'https://picsum.photos/200',
		// 	registerDate: new Date('12-22-2001'),
		// 	race: 'Орк какой-то',
		// 	heroClass: 'Убийца',
		// 	guild: 'Нечистая сила',
		// 	clusters: [
		// 		{
		// 			name: 'Статистика',
		// 			items: [
		// 				{name: 'Уровень', value: '56'},
		// 				{name: 'Максимум здоровья', value: '120'},
		// 				{name: 'Максимум маны', value: '222'},
		// 				{name: 'Золото', value: '5000'},
		// 			]
		// 		}
		// 	]
		// }
	}
};
