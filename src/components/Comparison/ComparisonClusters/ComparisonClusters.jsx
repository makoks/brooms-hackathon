import React, {useEffect, useState} from 'react'
import {Badge, Col, Collapse, Row, Space} from "antd";
import '../index.css'

const createClusters = (persons, onlyDifferent) => {
	const clusters = []

	persons.forEach(person => {
		person.clusters.forEach(c => {
			const cluster = clusters.find(cl => cl.title === c.title)
			if (!cluster) {
				clusters.push({
					title: c.title,
					props: c.properties.map(prop => ({
						title: prop.title,
						values: {
							[person.id]: prop.value
						}
					}))
				})
			} else {
				c.properties.forEach(p => {
					const prop = cluster.props.find(pr => pr.title === p.title)

					if (!prop) {
						cluster.props.push({
							title: p.title,
							values: {
								[person.id]: p.value
							}
						})
					} else {
						prop.values[person.id] = p.value
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

const ComparisonClusters = ({persons, onlyDifferent}) => {
	const [clusters, setClusters] = useState(createClusters(persons, onlyDifferent))
	const len = persons.length

	useEffect(() => {
		setClusters(createClusters(persons, onlyDifferent))
	}, [persons, onlyDifferent])

	return (
		<Collapse>
			{clusters.map(cluster => (
				<Collapse.Panel key={cluster.title} header={cluster.title}>
					<Space size='middle' direction='vertical' style={{width: '100%'}}>
						{cluster.props.map((prop, index) => (
							<Row key={index} wrap={false} align='middle' className='cluster-line'>
								<Col flex='200px'>
									<Badge color='blue' text={prop.title}/>
								</Col>
								<Col flex='auto'>
									<Row justify='space-around' gutter={24} align='middle'>
										{persons.map(({id}) => {
											const value = prop.values[id]

											return (
												<Col key={id} span={24 / len} style={{display: 'flex', justifyContent: 'center', width: 134}}>
													<div>{value || '—'}</div>
												</Col>
											)
										})}
									</Row>
								</Col>
								<Col flex='158px'/>
							</Row>
						))}
					</Space>
				</Collapse.Panel>
			))}
		</Collapse>
	)
}

export default ComparisonClusters