import {PropertyType} from "../../components/Clusters/types";

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

export const getValueViewByPropType = (propType: PropertyType, value: string | { name: string } | undefined) => {
    if (!value) return '—';

    switch (propType) {
        case 'ENUM':
            return typeof value !== "string" ? value.name : '';

        default:
            return value;
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