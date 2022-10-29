import {EmployeeForPage} from "../../hooks/types";
import {PropertyType} from "../Clusters/types";

export type UserClusters = {
    user: EmployeeForPage;
    clusters: Cluster[];
}

export type Cluster = {
    id: string;
    name: string;
    definition: string;
    properties: ClusterProperty[];
};

export type ClusterProperty = {
    id: string;
    name: string;
    type: PropertyType;
    value: ClusterPropertyValue
};

export type ClusterPropertyValue = {
    dateTimeValue: string | null;
    numberValue: string | null;
    stringValue: string | null;
    enumValue: { id: string, name: string } | null;
};

export type SourceOfChange = {
    id: string;
    name: string;
};

export type NewProperty = {
    idProperty: string;
    newValue: string | number;
};

export type FilterParam = {
    field: string;
    values: string[];
};

export type SortParam = {
    field: string;
    type: 'ASC' | 'DESC';
};

export type ExcelParams = {
    filterParams?: FilterParam[];
    sortParams?: SortParam[];
};