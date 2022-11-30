import {useEffect, useState} from 'react'
import {propertiesAPI} from "../API/API";
import {message} from "antd";
import {PropertyTypeObj} from "../components/Clusters/types";


const PROPS_TYPES: PropertyTypeObj[] = JSON.parse(JSON.stringify([{
    "type": "NUMBER",
    "title": "Число"
}, {
    "type": "STRING",
    "title": "Строка"
}, {
    "type": "DATE",
    "title": "Дата"
}, {
    "type": "ENUM",
    "title": "Список"
}]))

export const usePropertyTypes = () => {
    const [types, setTypes] = useState<PropertyTypeObj[]>(PROPS_TYPES);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const {getPropertyTypes} = propertiesAPI;

        getPropertyTypes()
            .then(data => setTypes(data))
            .catch(() => message.error('Не удалось загрузить типы свойств :('))
            .finally(() => setLoading(false));
    }, [])

    return {loading, types};
}