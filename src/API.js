import axios from "axios";

const API_URL = 'https://brooms.herokuapp.com/';
const config = {
	headers: {
		'content-type': 'application/json'
	}
}

export const referenceBooksAPI = {
	getRoles: async () => {
		return axios.get(`${API_URL}userRoles`, config)
	},

	getPositions: async () => {
		return axios.get(`${API_URL}userPositions`, config)
	},

	getDepartments: async () => {
		return axios.get(`${API_URL}userDepartments`, config)
	},

	getProjects: async () => {
		return axios.get(`${API_URL}userProjects`, config)
	}
}

export const employeesAPI = {
	getEmployees: async () => {
		return axios.get(`${API_URL}user`, config)
	},

	createEmployee: async (data) => {
		return axios.post(`${API_URL}user`, data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		})
	},

	deleteEmployee: async (id) => {
		return axios.delete(`${API_URL}user/${id}`, config)
	}
}

export const API = {
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
		await axios.put(`${API_URL}cluster/${id}`, body);
	},
	deleteCluster: async id => {
		await axios.delete(`${API_URL}cluster/${id}`);
	},

	addProperty: async (clusterId, nameProp) => {
		const response = await axios.post(`${API_URL}cluster/${clusterId}/properties`, { nameProp, typeofMp: 'string' });
		return response.data;
	},
	deleteProperty: async id => {
		await axios.delete(`${API_URL}property/${id}`);
	},
	editProperty: async (id, body) => {
		await axios.put(`${API_URL}property/${id}`, body);
	},

	addEnum: async (mpId, nameEnum) => {
		const response = await axios.post(`${API_URL}property/${mpId}/propertyDefinitions`, { nameEnum });
		return response.data;
	},
	deleteEnum: async id => {
		await axios.delete(`${API_URL}definition/${id}`);
	},
	editEnum: async (id, body) => {
		await axios.put(`${API_URL}definition/${id}`, body);
	},
};
