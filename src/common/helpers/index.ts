import {PropertyType} from "../../components/Clusters/types";
import React from "react";
import {FilterParam, SortParam} from "../../components/Employee/types";
import {SorterResult} from "antd/es/table/interface";
import {EmployeeForTable} from "../../hooks/types";

export const getShortName = (fio: string) => {
    const [surname, name, patronymic] = fio.split(' ')
    return `${surname} ${name ? `${name[0]}.` : ''} ${patronymic ? `${patronymic[0]}.` : ''}`
}

export const alphabetSort = (a: string, b: string) => {
    const nameA = a.toLowerCase()
    const nameB = b.toLowerCase()
    if (nameA < nameB)
        return -1
    if (nameA > nameB)
        return 1
    return 0
}

export const getPropValueByPropType = (propType: PropertyType) => {
    switch (propType) {
        case 'ENUM':
            return 'enumValue'

        case 'NUMBER':
            return 'numberValue'

        case 'DATE':
            return 'dateTimeValue'

        default:
            return 'stringValue'
    }
}

export const getValueViewByPropType = (propType: PropertyType, value: string | number | { name: string } | undefined | null) => {
    if (!value && value !== 0) return '—';

    switch (propType) {
        case 'ENUM':
            return typeof value !== "string" && typeof value !== "number" ? value.name : '';

        default:
            return String(value);
    }
}

export const downloadExcel = (blob: Blob, fileName: string) => {
    const blobFile = new Blob([blob], {type: 'application/vnd.ms-excel'})
    const href = URL.createObjectURL(blobFile)

    const a = Object.assign(document.createElement('a'), {
        href,
        style: 'display: none',
        download: `${fileName}.xlsx`
    })
    a.click()
    URL.revokeObjectURL(href)
    a.remove()
}

export const setFilterParams = (
    filters: Record<string, string[] | null>,
    setFilters: React.Dispatch<React.SetStateAction<FilterParam[]>>
) => {
    const filterParams: FilterParam[] = []

    Object.keys(filters).forEach(field => {
        if (!filters[field]) return

        filterParams.push({
            field: field,
            values: filters[field] ?? []
        })
    })

    setFilters([...filterParams])
}

export const setSorterParams = (
    sorter: SorterResult<EmployeeForTable> | SorterResult<EmployeeForTable>[],
    prevSorters: SortParam[],
    setSorters: React.Dispatch<React.SetStateAction<SortParam[]>>
) => {
    const {columnKey: field, order} = Array.isArray(sorter) ? sorter[0] : sorter;
    const orderTypes: Record<'ascend' | 'descend', 'ASC' | 'DESC'> = {'ascend': 'ASC', 'descend': 'DESC'};
    const sortParams = [...prevSorters];
    const param = sortParams.find(p => p.field === field);

    if (param && !order) {
        setSorters(sortParams.filter(p => p.field !== field));
    } else if (param && order) {
        setSorters(sortParams.map(p => {
            if (p.field === field) {
                return {...p, type: orderTypes[order]};
            }
            return p;
        }))
    } else if (!param && order) {
        setSorters([...sortParams, {field: String(field), type: orderTypes[order]}]);
    }
}