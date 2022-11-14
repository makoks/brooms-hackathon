import {useEffect, useState} from 'react'
import {propertiesAPI} from "../API/API";
import {message} from "antd";
import {PropertyTypeObj} from "../components/Clusters/types";


export const usePropertyTypes = () => {
    const [types, setTypes] = useState<PropertyTypeObj[]>([]);
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