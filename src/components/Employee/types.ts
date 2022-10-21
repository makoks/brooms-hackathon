import {Employee} from "../../hooks/types";
import {PropertyType} from "../Clusters/types";

export type UserClusters = {
    user: Employee;
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
    value: {
        dateTimeValue: string | null;
        numberValue: number | null;
        stringValue: string | null;
        enumValue: { id: string, name: string } | null;
    };
};

export type SourceOfChange = {
    id: string;
    name: string;
};

export type NewProperty = {
    id: string;
    newValue: string;
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
    filterParams: FilterParam[];
    sortParams: SortParam[];
};