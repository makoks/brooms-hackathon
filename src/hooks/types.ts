export type ReferenceBookType = {
    id: number;
    name: string;
};

export type Employee = {
    id: string;
    avatarUrl: string;
    fioUser: string;
    email: string;
    telephone: string;
    userDepartment: ReferenceBookType;
    userPosition: ReferenceBookType;
    userRole: ReferenceBookType;
    userProject: ReferenceBookType;
};

export type NewEmployeeData = {
    fioUser: string;
    email: string;
    telephone: string;
    idDepartment: string;
    idPosition: string;
    idRole: string;
    idProject?: string;
    avatar?: File | null;
}

export type EmployeeData = { id: string } & NewEmployeeData;