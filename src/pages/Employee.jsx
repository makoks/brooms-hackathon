import React, {useEffect, useState} from 'react';
import {Layout, message} from 'antd';
import {ContentHeader} from '../components';
import EmployeeMainInfo from "../components/Employee/EmployeePage/EmployeeMainInfo";
import EditBlock from "../components/Employee/EmployeePage/EditBlock";
import ClustersList from "../components/Employee/EmployeePage/ClustersList/ClustersList";
import {useParams} from "react-router-dom";
import {employeesAPI} from "../API/API";
import {getPropValueByPropType} from "../common/helpers";
import {useReferenceBooks} from "../hooks";
import {dateLocale} from "../common/locale";


export const Employee = () => {
	const {id} = useParams()
	const {loading: referenceBooksLoading, departments, positions, projects, roles} = useReferenceBooks()
	const [loading, setLoading] = useState(false)
	const [saving, setSaving] = useState(false)
	const [employee, setEmployee] = useState(undefined)
	const [clusters, setClusters] = useState([])
	const [editableClusters, setEditableClusters] = useState([])
	const [reason, setReason] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [changedProperties, setChangedProperties] = useState([])

	useEffect(() => {
		setLoading(true)
		const getEmployee = async () => {
			const res = await employeesAPI.getEmployeeClustersById(id)
			console.log(res.data)
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
			setSaving(true)
			employeesAPI.changeProperties(id, reason, changedProperties)
				.then(() => {
					setClusters([...editableClusters])
					toggleIsEdit()
					setSaving(false)
				})
		}
	}

	const discardChanges = () => {
		setEditableClusters([...clusters])
		setChangedProperties([])
		toggleIsEdit()
	}

	const changeClusterField = (clusterId, propId, propValueId, newValue) => {
		const newClusters = editableClusters.map(cluster => (
			cluster.id === clusterId
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
		setChangedProperties(prev => {
			let prop = prev.find(p => p.id === propValueId)
			if (prop) {
				prop.newValue = newValue._d
					? newValue?.format(dateLocale)
					: newValue
				return [...prev]
			}
			prop = {
				id: propValueId, newValue: newValue._d
					? newValue?.format(dateLocale)
					: newValue
			}
			return [...prev, prop]
		})
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
					avatar={employee?.avatarUrl}
					phone={employee?.telephone}
					department={departments?.find(d => d.id === employee?.idDepartment)?.name}
					project={projects?.find(p => p.id === employee?.idProject)?.name}
					role={roles?.find(r => r.id === employee?.idRole)?.name}
					post={positions?.find(p => p.id === employee?.idPosition)?.name}
				/>
				<EditBlock
					isEdit={isEdit}
					toggleIsEdit={toggleIsEdit}
					reason={reason}
					setReason={setReason}
					onDiscard={discardChanges}
					onSave={saveChanges}
					saving={saving}
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
