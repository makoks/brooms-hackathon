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
import {EmployeeForPage} from "../hooks/types";
import {Cluster, ClusterPropertyValue, NewProperty} from "../components/Employee/types";


export const Employee = () => {
	const {id} = useParams()
	const {loading: referenceBooksLoading, departments, positions, projects, roles} = useReferenceBooks()
	const [loading, setLoading] = useState(false)
	const [saving, setSaving] = useState(false)
	const [employee, setEmployee] = useState<EmployeeForPage | undefined>(undefined)
	const [clusters, setClusters] = useState<Cluster[]>([])
	const [editableClusters, setEditableClusters] = useState<Cluster[]>([])
	const [reason, setReason] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [changedProperties, setChangedProperties] = useState<NewProperty[]>([])

	useEffect(() => {
		setLoading(true)
		const getEmployee = async () => {
			const res = await employeesAPI.getEmployeeClustersById(id as string)
			setEmployee(res.data.user)
			setClusters(res.data.clusters)
			setEditableClusters(res.data.clusters)
		}
		getEmployee()
			.finally(() => setLoading(false))
	}, [id])

	const saveChanges = () => {
		if (!reason) {
			message.error('Необходимо выбрать причину изменения')
		} else {
			setSaving(true)
			employeesAPI.changeProperties(id as string, reason, changedProperties)
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

	const changeClusterField = (
		clusterId: string,
		propId: string,
		propType: string,
		newValue: string | undefined | ClusterPropertyValue['enumValue']
	) => {
		const newClusters = editableClusters.map(cluster => (
			cluster.id === clusterId
				? {
					...cluster,
					properties: cluster.properties.map(prop => (
						prop.id === propId
							? {
								...prop,
								value: {
									...prop.value,
									[getPropValueByPropType(prop.type)]: newValue
								}
							}
							: prop
					))
				}
				: cluster
		))
		setEditableClusters(newClusters)

		setChangedProperties(prev => {
			let prop = prev.find(p => p.idProperty === propId)
			if (prop) {
				prop.newValue = typeof newValue !== 'string' ? newValue?.id as string : newValue
				return [...prev]
			}
			prop = {
				idProperty: propId,
				newValue: typeof newValue !== 'string' ? newValue?.id as string : newValue
			}
			return [...prev, prop]
		})
	}

	const toggleIsEdit = () => {
		setIsEdit(!isEdit)
	}

	return (
		<Layout>
			<ContentHeader
				title='Сотрудник'
				paddingBottom={true}
				link={{text: 'Перейти к истории изменений', route: `../history?id=${id}`}}
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
