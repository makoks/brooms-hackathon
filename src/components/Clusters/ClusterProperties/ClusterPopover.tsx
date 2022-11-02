import React from 'react';
import {Button, Popover} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {ClusterProperties} from "./Properties/ClusterProperties";
import './style.css';
import {ClusterData, PropertyTypeObj} from "../types";


type ClusterPopoverProps = {
	cluster: ClusterData;
	propertyTypes: PropertyTypeObj[];
}

export const ClusterPopover: React.FC<ClusterPopoverProps> = ({cluster, propertyTypes}) => {
	return (
		<Popover
			placement="rightTop"
			trigger='click'
			content={<ClusterProperties {...cluster} propertyTypes={propertyTypes}/>}
			overlayClassName='cluster-properties'
			destroyTooltipOnHide={true}
		>
			<Button type="text" style={{float: 'right'}}>
				<CaretRightOutlined/>
			</Button>
		</Popover>
	);
};
