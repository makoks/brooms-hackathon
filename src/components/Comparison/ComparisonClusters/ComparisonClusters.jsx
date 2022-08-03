import React from 'react'
import {Badge, Col, Collapse, Row, Space} from "antd";

const createClusters = (persons) => {
	const clusters = []

	persons.forEach(person => {
		person.clusters.forEach(c => {
			const cluster = clusters.find(cl => cl.title === c.title)
			if (!cluster) {
				clusters.push({
					title: c.title,
					propsTitles: c.properties.map(prop => prop.title),
					propsValues: {
						[person.id]: c.properties.map(prop => prop.value ?? '—')
					}
				})
			} else {
				cluster.propsValues[person.id] = c.properties.map(prop => prop.value)
			}
		})
	})

	return clusters
}

const ComparisonClusters = ({persons}) => {
	const clusters = createClusters(persons)
	const len = persons.length

	return (
		<Collapse>
			{clusters.map(cluster => (
				<Collapse.Panel key={cluster.title} header={cluster.title}>
					<Row justify='space-between' align='middle' gutter={24} wrap={false}>
						<Col flex='212px'>
							<Space size='large' direction='vertical'>
								{cluster.propsTitles.map((title, index) => (
									<Badge color='blue' text={title} key={index}/>
								))}
							</Space>
						</Col>
						<Col flex='auto'>
							<Row justify='space-around' gutter={24} >
								{persons.map(({id}) => {
									const values = cluster.propsValues[id]
									return (
										<Col key={id} span={24/len} style={{display: 'flex', justifyContent: 'center'}}>
											{values && (
												<Space size='large' direction='vertical'>
													{values.map((value, i) => <div style={{width: 120}}
													                               key={i}>{value}</div>)}
												</Space>
											)}
										</Col>
									)
								})}
							</Row>
						</Col>
						<Col flex='170px'/>
					</Row>
				</Collapse.Panel>
			))}
		</Collapse>
	)
}

export default ComparisonClusters