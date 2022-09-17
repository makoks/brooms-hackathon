import React from 'react';
import {Button, Popover} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {ClusterProperties} from "./Properties/ClusterProperties";
import './style.css'

export const ClusterPopover = ({cluster}) => {
	return (
		<Popover
			placement="rightTop"
			trigger='click'
			content={<ClusterProperties {...cluster}/>}
			overlayClassName='cluster-properties'
			destroyTooltipOnHide={true}
		>
			<Button type="text" style={{float: 'right'}}>
				<CaretRightOutlined/>
			</Button>
		</Popover>
	);
};
