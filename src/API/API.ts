import axios from "axios";
import {
	ClusterPropertiesResponse,
	DepartmentsResponse,
	EmployeeResponse,
	EmployeesResponse, EnumListResponse, HistoryResponse, Id,
	PositionsResponse,
	ProjectsResponse,
	RolesResponse, SourceOfChangeResponse
} from "./types";
import { NewEmployeeData } from "../hooks/types";
import {
	ExcelParams,
	NewProperty,
	UserClusters
} from "../components/Employee/types";
import {
	NewClusterData,
	NewPropertyData,
	NewPropertyDataForAllUpdate,
	PropertyTypeObj
} from "../components/Clusters/types";

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
	getEmployee: async (id: Id) => {
		const res = await instance.get<EmployeeResponse>(`user/${id}?projection=userView`);
		return res.data._embedded.user;
	},

	getEmployees: async () => {
		const res = await instance.get<EmployeesResponse>('user');
		return res.data._embedded.user;
	},

	createEmployee: async (data: NewEmployeeData) => {
		return instance.post<{ id: Id }>('user', data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		});
	},

	deleteEmployee: async (id: Id) => {
		return instance.delete<{ id: Id }>(`user/${id}`);
	},

	getEmployeeClustersById: async (id: string) => {
		return instance.get<UserClusters>(`user/${id}/cluster`);
	},

	getEmployeesClustersByIds: async (ids: Id[]) => {
		const params = new URLSearchParams();
		for (const id of ids) {
			params.append('userIds', String(id));
		}
		const query = String(params);

		return instance.get<UserClusters[]>(`user/cluster?${query}`);
	},

	getChangeReasons: async () => {
		const res = await instance.get<SourceOfChangeResponse>('sourceOfChange');
		return res.data._embedded.sourceOfChange;
	},

	createReason: async (name: string) => {
		return instance.post('sourceOfChange', { name });
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
	getHistory: async (userId: Id | undefined, beginDate: string, endDate: string) => {
		const params = new URLSearchParams();
		params.append('beginDate', beginDate);
		params.append('endDate', endDate);
		const query = String(params);

		const res = await instance.get<HistoryResponse>(`user/${userId}/history?${query}`);
		return res.data.propertyHistories;
	},

	excelLoad: async (userId: Id | undefined, beginDate: string, endDate: string, excelParams: ExcelParams) => {
		const params = new URLSearchParams();
		params.append('beginDate', beginDate);
		params.append('endDate', endDate);
		const query = String(params);

		return instance.post(`user/${userId}/history/excel?${query}`, excelParams, { responseType: 'blob' });
	}
}

export const clustersAPI = {
	getClusters: async () => {
		return instance.get('cluster');
	},

	getClusterProperties: async (id: Id) => {
		const res = await instance.get<ClusterPropertiesResponse>(`cluster/${id}`);
		return res.data._embedded?.properties ?? [];
	},

	createCluster: async (clusterData: NewClusterData) => {
		return instance.post('cluster', clusterData);
	},

	editCluster: async (id: Id, name?: string, definition?: string) => {
		const clusterData: NewClusterData = {};
		if (name) {
			clusterData.name = name;
		}
		if (definition) {
			clusterData.definition = definition;
		}

		return instance.put(`cluster/${id}`, clusterData);
	},

	deleteCluster: async (id: Id) => {
		return instance.delete(`cluster/${id}`);
	},

	addProperty: async (clusterId: Id, propertyData: NewPropertyData) => {
		return instance.post(`cluster/${clusterId}/property`, propertyData);
	},
}

export const propertiesAPI = {
	getPropertyTypes: async () => {
		const res = await instance.get<PropertyTypeObj[]>('property/types');
		return res.data;
	},

	deleteProperty: async (id: Id) => {
		return instance.delete(`property/${id}`);
	},

	changeProperty: async (propertyId: Id, propData: NewPropertyData) => {
		return instance.put(`property/${propertyId}`, propData);
	},

	getEnumList: async (id: Id) => {
		const res = await instance.get<EnumListResponse>(`property/${id}`);
		return res.data._embedded.definitions ?? [];
	},

	deleteEnumItem: async (id: Id) => {
		return instance.delete(`definition/${id}`);
	},

	changeEnumItem: async (id: Id, name: string, point: number) => {
		return instance.put(`definition/${id}`, { name, point });
	},

	createEnumItem: async (name: string, idProperty: Id) => {
		return instance.post(`property/${idProperty}/definition`, { name });
	},

	changeAllEnums: async (propsData: NewPropertyDataForAllUpdate[]) => {
		return instance.put('definition', propsData);
	}
}
