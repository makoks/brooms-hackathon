import {Employee, ReferenceBookType} from "../hooks/types";
import {SourceOfChange} from "../components/Employee/types";

type ResponseType<T> = { _embedded: T; };

export type RolesResponse = ResponseType<{ userRole: ReferenceBookType[]; }>;
export type DepartmentsResponse = ResponseType<{ userDepartment: ReferenceBookType[]; }>;
export type ProjectsResponse = ResponseType<{ userProject: ReferenceBookType[]; }>;
export type PositionsResponse = ResponseType<{ userPosition: ReferenceBookType[]; }>;

export type EmployeeResponse = ResponseType<{ user: Employee; }>;
export type EmployeesResponse = ResponseType<{ user: Employee[]; }>;

export type SourceOfChangeResponse = ResponseType<SourceOfChange>;