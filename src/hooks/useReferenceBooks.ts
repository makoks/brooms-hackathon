import {useEffect, useState} from 'react'
import {referenceBooksAPI} from "../API/API";
import {ReferenceBookType} from "./types";


export const useReferenceBooks = () => {
	const [roles, setRoles] = useState<ReferenceBookType[]>([])
	const [departments, setDepartments] = useState<ReferenceBookType[]>([])
	const [positions, setPositions] = useState<ReferenceBookType[]>([])
	const [projects, setProjects] = useState<ReferenceBookType[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)
		const {getPositions, getDepartments, getProjects, getRoles} = referenceBooksAPI

		const getReferenceBooks = async () => {
			await Promise.all([
				getPositions().then((data) => setPositions(data)),
				getDepartments().then((data) => setDepartments(data)),
				getProjects().then((data) => setProjects(data)),
				getRoles().then((data) => setRoles(data)),
			])
		}

		getReferenceBooks()
			.finally(() => setLoading(false))
	}, [])

	return {loading, departments, projects, roles, positions}
}