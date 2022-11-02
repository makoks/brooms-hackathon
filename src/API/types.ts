import {EmployeeForTable, ReferenceBookType} from "../hooks/types";
import {SourceOfChange} from "../components/Employee/types";
import {HistoryFromAPI} from "../pages/History/types";
import {AxiosError} from "axios";

export type Id = number | string;

type ResponseType<T> = { _embedded: T; };

export type RolesResponse = ResponseType<{ userRole: ReferenceBookType[]; }>;
export type DepartmentsResponse = ResponseType<{ userDepartment: ReferenceBookType[]; }>;
export type ProjectsResponse = ResponseType<{ userProject: ReferenceBookType[]; }>;
export type PositionsResponse = ResponseType<{ userPosition: ReferenceBookType[]; }>;

export type EmployeeResponse = ResponseType<{ user: EmployeeForTable; }>;
export type EmployeesResponse = ResponseType<{ user: EmployeeForTable[]; }>;

export type SourceOfChangeResponse = ResponseType<{sourceOfChange: SourceOfChange[]}>;

export type HistoryResponse = { propertyHistories: HistoryFromAPI; };

export type Error = AxiosError<{ cause: string | null, message: string }>