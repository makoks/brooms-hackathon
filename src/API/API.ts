import axios from "axios";
import {
	DepartmentsResponse,
	EmployeeResponse,
	EmployeesResponse,
	PositionsResponse,
	ProjectsResponse,
	RolesResponse, SourceOfChangeResponse
} from "./types";
import {NewEmployeeData} from "../hooks/types";
import {
	ExcelParams,
	FilterParam,
	NewProperty,
	UserClusters
} from "../components/Employee/types";
import {NewClusterData, NewPropertyData, PropertyTypeObj} from "../components/Clusters/types";

const API_URL = 'https://brooms.herokuapp.com/';
const config = {
	baseURL: API_URL,
	headers: {
		'content-type': 'application/json',
	}
};
const instance = axios.create(config);

export const referenceBooksAPI = {
	getRoles: async () => {
		const res = await instance.get<RolesResponse>('userRole');
		return res.data._embedded.userRole;
	},

	getPositions: async () => {
		const res = await instance.get<PositionsResponse>('userPosition');
		return res.data._embedded.userPosition;
	},

	getDepartments: async () => {
		const res = await instance.get<DepartmentsResponse>('userDepartment');
		return res.data._embedded.userDepartment;
	},

	getProjects: async () => {
		const res = await instance.get<ProjectsResponse>('userProject');
		return res.data._embedded.userProject;
	}
}

export const employeesAPI = {
	getEmployee: async (id: string) => {
		const res = await instance.get<EmployeeResponse>(`user/${id}?projection=userView`);
		return res.data._embedded.user;
	},

	getEmployees: async () => {
		const res = await instance.get<EmployeesResponse>('user');
		return res.data._embedded.user;
	},

	createEmployee: async (data: NewEmployeeData) => {
		return instance.post<{id: string}>('user', data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		});
	},

	deleteEmployee: async (id: string) => {
		return instance.delete<{id: string}>(`user/${id}`);
	},

	getEmployeeClustersById: async (id: string) => {
		return instance.get<UserClusters>(`user/${id}/cluster`);
	},

	getEmployeesClustersByIds: async (ids: string[]) => {
		const params = new URLSearchParams();
		for (const id of ids) {
			params.append('userIds', id);
		}
		const query = String(params);

		return instance.get<UserClusters[]>(`user/cluster?${query}`);
	},

	getChangeReasons: async () => {
		return instance.get<SourceOfChangeResponse>('sourceOfChange');
	},

	createReason: async (name: string) => {
		return instance.post('sourceOfChange', {name});
	},

	changeProperties: async (userId: string, changeReasonId: string, changedProperties: NewProperty[]) => {
		return instance.put(`user/${userId}/values`, {
			idSourceOfChange: changeReasonId,
			changeValues: changedProperties
		});
	},

	excelLoad: async (params: ExcelParams) => {
		return instance.post('user/excel', params, { responseType: 'blob' });
	}
}

export const historyAPI = {
	getHistory: async (userId: string, beginDate: string, endDate: string) => {
		const params = new URLSearchParams();
		params.append('beginDate', beginDate);
		params.append('endDate', endDate);
		const query = String(params);

		return instance.get(`user/${userId}/history?${query}`);
	},

	excelLoad: async (userId: string, beginDate: string, endDate: string, filters: FilterParam[]) => {
		const params = new URLSearchParams();
		params.append('beginDate', beginDate);
		params.append('endDate', endDate);
		const query = String(params);

		return instance.post(`user/${userId}/history/excel?${query}`, filters, { responseType: 'blob' });
	}
}

export const clustersAPI = {
	getClusters: async () => {
		return instance.get('cluster');
	},

	getClusterProperties: async (id: string) => {
		const res = await instance.get(`cluster/${id}`);
		return res.data._embedded.properties;
	},

	createCluster: async (clusterData: NewClusterData) => {
		return instance.post('cluster', clusterData);
	},

	editCluster: async (id: string, name?: string, definition?: string) => {
		const clusterData: NewClusterData = {};
		if (name) {
			clusterData.name = name;
		}
		if (definition) {
			clusterData.definition = definition;
		}

		return instance.put(`cluster/${id}`, clusterData);
	},

	deleteCluster: async (id: string) => {
		return instance.delete(`cluster/${id}`);
	},

	addProperty: async (clusterId: string, propertyData: NewPropertyData) => {
		return instance.post(`cluster/${clusterId}/property`, propertyData);
	},
}

export const propertiesAPI = {
	getPropertyTypes: async () => {
		const res = await instance.get<PropertyTypeObj[]>('property/types');
		return res.data;
	},

	deleteProperty: async (id: string) => {
		return instance.delete(`property/${id}`);
	},

	changeProperty: async (propertyId: string, propData: NewPropertyData) => {
		return instance.put(`property/${propertyId}`, propData);
	},

	getEnumList: async (id: string) => {
		const res = await instance.get(`property/${id}`);
		return res.data._embedded.definitions ?? [];
	},

	deleteEnumItem: async (id: string) => {
		return instance.delete(`definition/${id}`);
	},

	changeEnumItem: async (id: string, name: string) => {
		return instance.put(`definition/${id}`, {name});
	},

	createEnumItem: async (name: string, idProperty: string) => {
		return instance.post(`property/${idProperty}/definition`, {name});
	}
}
