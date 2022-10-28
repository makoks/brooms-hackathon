import {useContext, useEffect, useState} from 'react'
import {employeesAPI} from "../API/API";
import {CompareListContext} from "../providers/CompareListProvider";
import {message} from "antd";
import {EmployeeForTable, NewEmployeeData} from "./types";
import {Id} from "../API/types";


export const useEmployees = () => {
	const {removeFromCompareList} = useContext(CompareListContext)
	const [employees, setEmployees] = useState<EmployeeForTable[]>([])
	const [deletingIds, setDeletingIds] = useState<Id[]>([])
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

	const deleteEmployee = async (id: Id) => {
		setDeletingIds(oldDeletingIds => [...oldDeletingIds, id])
		employeesAPI.deleteEmployee(id)
			.then(() => {
				removeFromCompareList(id)
				setDeletingIds(oldDeletingIds => oldDeletingIds.filter(dId => dId !== id))
				setEmployees(oldEmployees => oldEmployees.filter(e => e.id !== id))
				message.success('Сотрудник успешно удален!')
			})
			.catch(() => message.error('Что-то пошло не так :('))
	}

	useEffect(() => {
		setLoading(true)

		const getEmployees = async () => {
			const res = await employeesAPI.getEmployees()
			setEmployees(res)
		}

		getEmployees()
			.catch(() => message.error('Не удалось загрузить список сотрудников :('))
			.finally(() => setLoading(false))
	}, [])

	return {loading, employees, deleteEmployee, deletingIds, createEmployee}
}