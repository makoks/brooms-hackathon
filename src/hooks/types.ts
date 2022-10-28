import {Id} from "../API/types";

export type ReferenceBookType = {
    id: Id;
    name: string;
};

export type EmployeeForTable = {
    id: Id;
    avatarUrl: string;
    fioUser: string;
    email: string;
    telephone: string;
    userDepartment: ReferenceBookType;
    userPosition: ReferenceBookType;
    userRole: ReferenceBookType;
    userProject: ReferenceBookType;
};

export type EmployeeForPage = {
    id: Id;
    avatarUrl: string;
    fioUser: string;
    email: string;
    telephone: string;
    idDepartment: Id;
    idPosition: Id;
    idRole: Id;
    idProject?: Id;
}

export type NewEmployeeData = {
    fioUser: string;
    email: string;
    telephone: string;
    idDepartment: Id;
    idPosition: Id;
    idRole: Id;
    idProject?: Id;
    avatar?: File | null;
}
