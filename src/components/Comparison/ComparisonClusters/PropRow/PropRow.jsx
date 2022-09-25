import React from 'react'
import '../../index.css'
import {Badge, Col, Row} from "antd";


const PropRow = ({prop, employees}) => {
	const len = employees.length

	return (
		<Row wrap={false} align='middle' className='cluster-line'>
			<Col flex='188px'>
				<Badge color='blue' text={prop.title}/>
			</Col>
			<Col flex='auto'>
				<Row justify='space-around' gutter={24} align='middle'>
					{employees.map(({user}) => {
						const value = prop.values[user.id]

						return (
							<Col key={user.id} span={24 / len}
							     style={{
								     display: 'flex',
								     justifyContent: 'center',
								     width: 134
							     }}>
								<div>{value
									? value.name
										? value.name
										: value
									: '—'}</div>
							</Col>
						)
					})}
				</Row>
			</Col>
			<Col flex='146px'/>
		</Row>
	)
}

export default PropRow