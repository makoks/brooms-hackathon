import {useEffect, useState} from 'react'
import {referenceBooksAPI} from "../API";


export const useReferenceBooks = () => {
    const [roles, setRoles] = useState(undefined)
    const [departments, setDepartments] = useState(undefined)
    const [positions, setPositions] = useState(undefined)
    const [projects, setProjects] = useState(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const {getPositions, getDepartments, getProjects, getRoles} = referenceBooksAPI

        const getReferenceBooks = async () => {
            await Promise.all([
                getPositions().then(({ data }) => setPositions(data._embedded.userPosition)),
                getDepartments().then(({ data }) => setDepartments(data._embedded.userDepartment)),
                getProjects().then(({ data }) => setProjects(data._embedded.userProject)),
                getRoles().then(({ data }) => setRoles(data._embedded.userRole)),
            ])
        }

        getReferenceBooks()
            .finally(() => setLoading(false))
    }, [])

    return {loading, departments, projects, roles, positions}
}