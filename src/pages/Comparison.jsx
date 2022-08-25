import React, {useContext, useEffect, useState} from 'react';
import {Layout} from 'antd';
import {ContentHeader} from '../components';
import ComparisonHeaderBlock from "../components/Comparison/ComparisonHeaderBlock/ComparisonHeaderBlock";
import {employeesAPI} from "../API";
import {CompareListContext} from "../providers/CompareListProvider";
import ComparisonClusters from "../components/Comparison/ComparisonClusters/ComparisonClusters";

export const Comparison = () => {
	const [onlyDifferent, setOnlyDifferent] = useState(false)
	const [employees, setEmployees] = useState([])
	const {compareList} = useContext(CompareListContext)

	// Получение сотрудников по содержащимся в списке сравнения id
	useEffect(() => {
		const getEmployees = async () => {
			const tempEmployees = []
			for (const employeeId of compareList) {
				const res = await employeesAPI.getEmployee(employeeId)
				tempEmployees.push(res.data)
			}
			setEmployees(tempEmployees)
			console.log(tempEmployees)
		}

		getEmployees()
	}, [compareList])

	return (
		<Layout>
			<ContentHeader title='Сравнение' paddingBottom={true}>
				<ComparisonHeaderBlock
					employees={employees.map(e => e.user)}
					onlyDifferent={onlyDifferent}
					setOnlyDifferent={setOnlyDifferent}
				/>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<ComparisonClusters employees={employees} onlyDifferent={onlyDifferent}/>
			</Layout.Content>
		</Layout>
	);
};
