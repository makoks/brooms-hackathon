import { Id } from "../../API/types";

export type PropertyType = 'NUMBER' | 'STRING' | 'ENUM' | 'DATE';
export type PropertyTitle = 'Число' | 'Строка' | 'Список' | 'Дата';

export type PropertyTypeObj = {
    type: PropertyType;
    title: PropertyTitle;
};

export type ClusterData = { id: Id; } & NewClusterData;

export type NewClusterData = {
    name?: string;
    definition?: string;
};

export type PropertyData = { id: Id; } & NewPropertyData;

export type NewPropertyData = {
    name?: string;
    type?: PropertyType;
};

export type Enum = {
    id: string;
    name: string;
    point: number;
}