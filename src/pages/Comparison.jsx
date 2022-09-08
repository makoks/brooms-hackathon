import React, {useContext, useEffect, useState} from 'react';
import {Layout, TreeSelect} from 'antd';
import {ContentHeader} from '../components';
import ComparisonHeaderBlock from "../components/Comparison/ComparisonHeaderBlock/ComparisonHeaderBlock";
import {employeesAPI} from "../API/API";
import {CompareListContext} from "../providers/CompareListProvider";
import ComparisonClusters from "../components/Comparison/ComparisonClusters/ComparisonClusters";
import {getPropValueByPropType} from "../common/helpers";


const createClusters = (employees, onlyDifferent, selectedProps) => {
	const clusters = []

	employees.forEach(employee => {
		employee.clusters.forEach(c => {
			const cluster = clusters.find(cl => cl.title === c.name)
			if (!cluster) {
				clusters.push({
					id: `cluster-${c.id}`,
					definition: c.definition,
					title: c.name,
					props: c.properties.map(p => ({
						id: `prop-${p.id}`,
						title: p.name,
						values: {
							[employee.user.id]: p.value[getPropValueByPropType(p.type)]
						}
					}))
				})
			} else {
				c.properties.forEach(p => {
					const prop = cluster.props.find(pr => pr.title === p.name)

					if (!prop) {
						cluster.props.push({
							id: `prop-${p.id}`,
							title: p.name,
							values: {
								[employee.user.id]: p.value[getPropValueByPropType(p.type)]
							}
						})
					} else {
						prop.values[employee.user.id] = p.value[getPropValueByPropType(p.type)]
					}
				})
			}
		})
	})

	if (onlyDifferent || selectedProps.length > 0) {
		clusters.forEach(cluster => {
			cluster.props = cluster.props.filter(prop => {
				return (onlyDifferent && !isAllValuesEqual(prop))
				|| (selectedProps.length > 0 && selectedProps.includes(prop.id))
			})
		})
	}

	return clusters
}

const isAllValuesEqual = (prop) => {
	const ids = Object.keys(prop.values)
	if (ids.length === 1) return false

	let prev = prop.values[ids[0]]

	for (let i = 1; i < ids.length; i++) {
		if (prop.values[ids[i]] !== prev) {
			return false
		}
		prev = prop.values[ids[i]]
	}

	return true
}


export const Comparison = () => {
	const [onlyDifferent, setOnlyDifferent] = useState(false)
	const [employees, setEmployees] = useState([])
	const {compareList} = useContext(CompareListContext)
	const [initClusters, setInitClusters] = useState([])
	const [clusters, setClusters] = useState([])
	const [selectedProps, setSelectedProps] = useState([])

	useEffect(() => {
		setInitClusters(createClusters(employees, false, []))
	}, [employees])

	useEffect(() => {
		setClusters(createClusters(employees, onlyDifferent, selectedProps))
	}, [employees, onlyDifferent, selectedProps])

	// Получение сотрудников по содержащимся в списке сравнения id
	useEffect(() => {
		const getEmployees = async () => {
			const res = await employeesAPI.getEmployeesClustersByIds(compareList)
			setEmployees(res.data)
		}

		getEmployees()
	}, [compareList])

	return (
		<Layout>
			<ContentHeader title='Сравнение' paddingBottom={true}>
				<TreeSelect
					value={selectedProps}
					onChange={setSelectedProps}
					style={{width: '100%', marginBottom: 20}}
					dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
					placeholder='Выберите свойства'
					fieldNames={{label: 'title', value: 'id', children: 'props'}}
					treeData={initClusters}
					showSearch={false}
					treeDefaultExpandAll
					treeCheckable
				/>
				<ComparisonHeaderBlock
					employees={employees.map(e => e.user)}
					onlyDifferent={onlyDifferent}
					setOnlyDifferent={setOnlyDifferent}
				/>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<ComparisonClusters employees={employees} clusters={clusters}/>
			</Layout.Content>
		</Layout>
	);
};
