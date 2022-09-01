import {useContext, useEffect, useState} from 'react'
import {employeesAPI} from "../API/API";
import {CompareListContext} from "../providers/CompareListProvider";
import {message} from "antd";


export const useEmployees = () => {
	const {removeFromCompareList} = useContext(CompareListContext)
	const [employees, setEmployees] = useState([])
	const [deletingIds, setDeletingIds] = useState([])
	const [loading, setLoading] = useState(false)

	const createEmployee = async (data, onSuccess) => {
		setLoading(true)
		employeesAPI.createEmployee(data)
			.then(() => {
				message.success('Сотрудник успешно добавлен!')
				onSuccess()
			})
			.catch(() => message.error('Что-то пошло не так :('))
			.finally(() => setLoading(false))
	}

	const deleteEmployee = async (id) => {
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
			setEmployees(res.data._embedded.user)
		}

		getEmployees()
			.finally(() => setLoading(false))
	}, [])

	return {loading, employees, deleteEmployee, deletingIds, createEmployee}
}