import React from 'react'
import {Col, Row} from "antd";
import ClusterCard from "./ClusterCard/ClusterCard";


const ClustersList = ({clusters, isEdit, changeClusterField, editableClusters}) => {
	const data = isEdit ? editableClusters : clusters

	return (
		<Row gutter={[45, 20]}>
			{data.map((cluster, index) => (
				<Col span={6} key={index}>
					<ClusterCard
						name={cluster.name}
						items={cluster.items}
						isEdit={isEdit}
						changeClusterField={changeClusterField}
					/>
				</Col>
			))}
		</Row>
	)
}

export default ClustersList