import React from 'react';
import {Button, Popover} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {ClusterProperties} from "./Properties/ClusterProperties";
import './style.css';
import {ClusterData, PropertyTypeObj} from "../types";


type ClusterPopoverProps = {
	cluster: ClusterData;
	propTypes: PropertyTypeObj[];
}

export const ClusterPopover: React.FC<ClusterPopoverProps> = ({cluster, propTypes}) => {
	return (
		<Popover
			placement="rightTop"
			trigger='click'
			content={<ClusterProperties {...cluster} propTypes={propTypes}/>}
			overlayClassName='cluster-properties'
			destroyTooltipOnHide={true}
		>
			<Button type="text" style={{float: 'right'}}>
				<CaretRightOutlined/>
			</Button>
		</Popover>
	);
};
