import axios from "axios";

const API_URL = 'https://brooms.herokuapp.com/';
const config = {
	headers: {
		'content-type': 'application/json'
	}
}

export const API = {
	getHeroes: async () => {
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

	getHero: async (id) => {
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
	},

	deleteHero: (id) => {
		return axios.delete(`${API_URL}hero/${id}`, config)
	},

	createHero: (heroData) => {
		return axios.post(`${API_URL}hero`, JSON.stringify(heroData), config)
	},

	getHeroRaces: () => {
		return axios.get(`${API_URL}heroRaces`, config)
	},

	getHeroClasses: () => {
		return axios.get(`${API_URL}heroClasses`, config)
	},

	getHeroGuilds: () => {
		return axios.get(`${API_URL}heroGuilds`, config)
	},

	clusters: async () => {
		const response = await axios.get(`${API_URL}cluster`);
		return response.data._embedded.cluster;
	},
	addCluster: async nameCluster => {
		const response = await axios.post(`${API_URL}cluster`, { nameCluster });
		return response.data;
	},
	editCluster: async (id, body) => {
		await axios.put(`${API_URL}cluster/${id}`, { ...body });
	},
	deleteCluster: async id => {
		await axios.delete(`${API_URL}cluster/${id}`);
	},
};
