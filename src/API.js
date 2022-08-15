import axios from "axios";

const API_URL = 'https://brooms.herokuapp.com/';
const config = {
	baseURL: API_URL,
	headers: {
		'content-type': 'application/json'
	}
}
const instance = axios.create(config)

export const referenceBooksAPI = {
	getRoles: async () => {
		return instance.get('userRoles')
	},

	getPositions: async () => {
		return instance.get('userPositions')
	},

	getDepartments: async () => {
		return instance.get('userDepartments')
	},

	getProjects: async () => {
		return instance.get('userProjects')
	}
}

export const employeesAPI = {
	getEmployees: async () => {
		return instance.get('user')
	},

	createEmployee: async (data) => {
		return instance.post('user', data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		})
	},

	deleteEmployee: async (id) => {
		return instance.delete(`user/${id}`)
	},

	getEmployee: async (id) => {
		return instance.get(`userCluster/${id}`)
	},

	getChangeReasons: async () => {
		return instance.get('sourceOfChanges')
	},

	createReason: async (nameSource) => {
		return instance.post('sourceOfChanges', {nameSource})
	}
}

export const historyAPI = {
	getHistory: async (userId, beginDate, endDate) => {
		return instance.post(`user/${userId}/history`, {beginDate, endDate})
	}
}

export const API = {
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
