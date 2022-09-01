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
		return instance.get('userRole')
	},

	getPositions: async () => {
		return instance.get('userPosition')
	},

	getDepartments: async () => {
		return instance.get('userDepartment')
	},

	getProjects: async () => {
		return instance.get('userProject')
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

	getEmployeeClustersById: async (id) => {
		return instance.get(`user/${id}/cluster`)
	},

	getEmployeesClustersByIds: async (ids) => {
		const params = new URLSearchParams();
		for (const id of ids) {
			params.append('userIds', id);
		}
		const query = String(params)

		return instance.get(`user/cluster?${query}`)
	},

	getChangeReasons: async () => {
		return instance.get('sourceOfChange')
	},

	createReason: async (name) => {
		return instance.post('sourceOfChange', {name})
	}
}

export const historyAPI = {
	getHistory: async (userId, beginDate, endDate) => {
		const params = new URLSearchParams()
		params.append('beginDate', beginDate)
		params.append('endDate', endDate)
		const query = String(params)

		return instance.get(`user/${userId}/history?${query}`)
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
