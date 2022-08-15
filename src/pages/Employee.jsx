import React, {useEffect, useState} from 'react';
import {Layout, message} from 'antd';
import {ContentHeader} from '../components';
import EmployeeMainInfo from "../components/Employee/EmployeePage/EmployeeMainInfo";
import EditBlock from "../components/Employee/EmployeePage/EditBlock";
import ClustersList from "../components/Employee/EmployeePage/ClustersList/ClustersList";
import {useParams} from "react-router-dom";
import {employeesAPI} from "../API";
import {getPropValueByPropType} from "../common/helpers";


export const Employee = ({referenceBooks, referenceBooksLoading}) => {
	const {id} = useParams()
	const [loading, setLoading] = useState(false)
	const [employee, setEmployee] = useState(undefined)
	const [clusters, setClusters] = useState([])
	const [editableClusters, setEditableClusters] = useState([])
	const [reason, setReason] = useState('')
	const [isEdit, setIsEdit] = useState(false)

	useEffect(() => {
		setLoading(true)
		const getEmployee = async () => {
			const res = await employeesAPI.getEmployee(id)
			setEmployee(res.data.user)
			setClusters(res.data.clusterModelWithProperties)
			setEditableClusters(res.data.clusterModelWithProperties)
		}

		getEmployee()
			.finally(() => setLoading(false))
	}, [id])

	const saveChanges = () => {
		if (!reason) {
			message.error('Необходимо выбрать причину изменения')
		} else {
			setClusters([...editableClusters])
			toggleIsEdit()
		}
	}

	const discardChanges = () => {
		setEditableClusters([...clusters])
		toggleIsEdit()
	}

	const changeClusterField = (clusterName, propId, newValue) => {
		const newClusters = editableClusters.map(cluster => (
			cluster.nameCluster === clusterName
				? {
					...cluster,
					properties: cluster.properties.map(prop => (
						prop.id === propId
							? {
								...prop,
								propertyValueModels: {
									...prop.propertyValueModels,
									[getPropValueByPropType(prop.typeofMp)]: newValue
								}
							}
							: prop
					))
				}
				: cluster
		))
		setEditableClusters(newClusters)
	}

	const toggleIsEdit = () => {
		setIsEdit(!isEdit)
	}

	return (
		<Layout>
			<ContentHeader
				title='Сотрудник'
				paddingBottom={true}
				link={{text: 'Перейти к истории изменений', route: '../history'}}
			>
				<EmployeeMainInfo
					loading={loading || referenceBooksLoading}
					name={employee?.fioUser}
					email={employee?.email}
					avatar={employee?.avatar}
					phone={employee?.telephone}
					department={referenceBooks.departments?.find(d => d.id === employee?.idDepartment)?.name}
					project={referenceBooks.projects?.find(p => p.id === employee?.idProject)?.name}
					role={referenceBooks.roles?.find(r => r.id === employee?.idRole)?.name}
					post={referenceBooks.positions?.find(p => p.id === employee?.idPosition)?.name}
				/>
				<EditBlock
					isEdit={isEdit}
					toggleIsEdit={toggleIsEdit}
					reason={reason}
					setReason={setReason}
					onDiscard={discardChanges}
					onSave={saveChanges}
				/>
			</ContentHeader>
			<Layout.Content style={{margin: '27px 34px'}}>
				<ClustersList
					clusters={clusters}
					editableClusters={editableClusters}
					isEdit={isEdit}
					onPropChange={changeClusterField}
				/>
			</Layout.Content>
		</Layout>
	);
};
