import React from 'react';
import {Button, Popover} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {ClusterProperties} from "./Properties/ClusterProperties";
import './style.css';
import {ClusterData} from "../types";


type ClusterPopoverProps = {
	cluster: ClusterData;
}

export const ClusterPopover: React.FC<ClusterPopoverProps> = ({cluster}) => {
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
