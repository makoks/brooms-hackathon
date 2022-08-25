import React, {useEffect, useState} from 'react'
import {Badge, Col, Collapse, Row, Space} from "antd";
import '../index.css'
import {getPropValueByPropType} from "../../../common/helpers";

const createClusters = (employees, onlyDifferent) => {
	const clusters = []

	employees.forEach(employee => {
		employee.clusterModelWithProperties.forEach(c => {
			const cluster = clusters.find(cl => cl.title === c.nameCluster)
			if (!cluster) {
				clusters.push({
					title: c.nameCluster,
					props: c.properties.map(p => ({
						title: p.nameProp,
						values: {
							[employee.user.id]: p.propertyValueModels[getPropValueByPropType(p.typeofMp)]
						}
					}))
				})
			} else {
				c.properties.forEach(p => {
					const prop = cluster.props.find(pr => pr.title === p.nameProp)

					if (!prop) {
						cluster.props.push({
							title: p.nameProp,
							values: {
								[employee.user.id]: p.propertyValueModels[getPropValueByPropType(p.typeofMp)]
							}
						})
					} else {
						prop.values[employee.user.id] = p.propertyValueModels[getPropValueByPropType(p.typeofMp)]
					}
				})
			}
		})
	})

	if (onlyDifferent) {
		clusters.forEach(cluster => {
			cluster.props = cluster.props.filter(prop => !isAllValuesEqual(prop))
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

const ComparisonClusters = ({employees, onlyDifferent}) => {
	const [clusters, setClusters] = useState(createClusters(employees, onlyDifferent))
	const len = employees.length

	useEffect(() => {
		setClusters(createClusters(employees, onlyDifferent))
	}, [employees, onlyDifferent])

	return (
		<Collapse>
			{clusters.map(cluster => (
				<Collapse.Panel key={cluster.title} header={cluster.title}>
					<Space size='middle' direction='vertical' style={{width: '100%'}}>
						{cluster.props.map((prop, index) => (
							<Row key={index} wrap={false} align='middle' className='cluster-line'>
								<Col flex='188px'>
									<Badge color='blue' text={prop.title}/>
								</Col>
								<Col flex='auto'>
									<Row justify='space-around' gutter={24} align='middle'>
										{employees.map(({user}) => {
											const value = prop.values[user.id]

											return (
												<Col key={user.id} span={24 / len} style={{display: 'flex', justifyContent: 'center', width: 134}}>
													<div>{value || '—'}</div>
												</Col>
											)
										})}
									</Row>
								</Col>
								<Col flex='146px'/>
							</Row>
						))}
					</Space>
				</Collapse.Panel>
			))}
		</Collapse>
	)
}

export default ComparisonClusters