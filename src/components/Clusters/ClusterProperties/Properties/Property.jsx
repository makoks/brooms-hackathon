import React from 'react'
import {Button, Space, Typography} from "antd";
import {DeleteOutlined} from "@ant-design/icons";


export const Property = ({property}) => {
	return (
		<div>
			<Space size="middle">
				<Button
					icon={<DeleteOutlined/>}
					shape="circle" type="default"
					danger size="small"
					disabled={true}
				/>
				<div>
					<Typography.Text style={{marginBottom: 0}}>
						{property.name}
					</Typography.Text>
				</div>
			</Space>
			{/*<Button type="text" style={{float: 'right'}}>*/}
			{/*	<CaretRightOutlined/>*/}
			{/*</Button>*/}
		</div>
	)
}