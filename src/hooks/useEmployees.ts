import {useContext, useEffect, useState} from 'react'
import {employeesAPI} from "../API/API";
import {CompareListContext} from "../providers/CompareListProvider";
import {message} from "antd";
import {Employee, NewEmployeeData} from "./types";


export const useEmployees = () => {
	const {removeFromCompareList} = useContext(CompareListContext)
	const [employees, setEmployees] = useState<Employee[]>([])
	const [deletingIds, setDeletingIds] = useState<string[]>([])
	const [loading, setLoading] = useState(false)

	const createEmployee = async (data: NewEmployeeData, onSuccess: Function) => {
		setLoading(true)
		employeesAPI.createEmployee(data)
			.then(async ({data: {id}}) => {
				message.success('Сотрудник успешно добавлен!')
				setLoading(true)
				const newEmployee = await employeesAPI.getEmployee(id)
				setEmployees(oldEmployees => [...oldEmployees, newEmployee])
				setLoading(false)
				onSuccess()
			})
			.catch(() => message.error('Что-то пошло не так :('))
			.finally(() => setLoading(false))
	}

	const deleteEmployee = async (id: string) => {
		setDeletingIds(oldDeletingIds => [...oldDeletingIds, id])
		employeesAPI.deleteEmployee(id)
			.then(() => {
				removeFromCompareList(id)
				setDeletingIds(oldDeletingIds => oldDeletingIds.filter(dId => dId !== id))
				setEmployees(oldEmployees => oldEmployees.filter(e => e.id !== id))
				message.success('Сотрудник успешно удален!')
			})
	}

	useEffect(() => {
		setLoading(true)

		const getEmployees = async () => {
			const res = await employeesAPI.getEmployees()
			setEmployees(res)
		}

		getEmployees()
			.finally(() => setLoading(false))
	}, [])

	return {loading, employees, deleteEmployee, deletingIds, createEmployee}
}