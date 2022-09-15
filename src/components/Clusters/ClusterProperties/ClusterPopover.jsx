import React from 'react';
import {Button, Popover} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {ClusterProperties} from "./ClusterProperties";
import './style.css'

export const ClusterPopover = (props) => {
	return (
		<Popover
			placement="rightTop"
			trigger='click'
			content={<ClusterProperties {...props}/>}
			overlayClassName='cluster-properties'
		>
			<Button type="text" style={{float: 'right'}}>
				<CaretRightOutlined/>
			</Button>
		</Popover>
	);
};
