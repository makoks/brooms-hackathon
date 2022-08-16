import React, {useEffect, useState} from 'react'
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
            const positions = await getPositions()
            const departments = await getDepartments()
            const projects = await getProjects()
            const roles = await getRoles()

            setPositions(positions.data._embedded.userPositions)
            setDepartments(departments.data._embedded.userDepartments)
            setProjects(projects.data._embedded.userProjects)
            setRoles(roles.data._embedded.userRoles)
        }

        getReferenceBooks()
            .finally(() => setLoading(false))
    }, [])

    return {loading, departments, projects, roles, positions}
}