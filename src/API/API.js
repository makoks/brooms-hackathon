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
	getEmployee: async (id) => {
		return instance.get(`user/${id}?projection=userView`)
	},

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
	},

	changeProperties: async (userId, changeReasonId, changedProperties) => {
		return instance.put(`user/${userId}/values`, {
			idSourceOfChange: changeReasonId,
			changeValues: changedProperties
		})
	},

	excelLoad: async (params) => {
		return instance.post('user/excel', params, { responseType: 'blob' })
	}
}

export const historyAPI = {
	getHistory: async (userId, beginDate, endDate) => {
		const params = new URLSearchParams()
		params.append('beginDate', beginDate)
		params.append('endDate', endDate)
		const query = String(params)

		return instance.get(`user/${userId}/history?${query}`)
	},

	excelLoad: async (userId, beginDate, endDate, filters) => {
		const params = new URLSearchParams()
		params.append('beginDate', beginDate)
		params.append('endDate', endDate)
		const query = String(params)

		return instance.post(`user/${userId}/history/excel?${query}`, filters, { responseType: 'blob' })
	}
}

export const clustersAPI = {
	getClusters: async () => {
		return instance.get('cluster')
	},

	getClusterProperties: async (id) => {
		const res = await instance.get(`cluster/${id}`)
		return res.data._embedded.properties
	},

	createCluster: async (clusterData) => {
		return instance.post('cluster', clusterData)
	},

	editCluster: async (id, name, definition) => {
		const clusterData = {}
		if (name) {
			clusterData.name = name
		}
		if (definition) {
			clusterData.definition = definition
		}

		return instance.put(`cluster/${id}`, clusterData)
	},

	deleteCluster: async (id) => {
		return instance.delete(`cluster/${id}`)
	},

	addProperty: async (clusterId, propertyData) => {
		return instance.post(`cluster/${clusterId}/property`, propertyData)
	},
}

export const propertiesAPI = {
	getPropertyTypes: async () => {
		const res = await instance.get('property/types')
		return res.data
	},

	deleteProperty: async (id) => {
		return instance.delete(`property/${id}`)
	},

	changeProperty: async (propertyId, propData) => {
		return instance.put(`property/${propertyId}`, propData)
	},

	getEnumList: async (id) => {
		const res = await instance.get(`property/${id}`)
		return res.data._embedded.definitions ?? []
	},

	deleteEnumItem: async (id) => {
		return instance.delete(`definition/${id}`)
	},

	changeEnumItem: async (id, name) => {
		return instance.put(`definition/${id}`, {name})
	},

	createEnumItem: async (name, idProperty) => {
		return instance.post(`property/${idProperty}/definition`, {name})
	}
}
