import React from 'react'
import {Button, Popover} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import {EnumList} from "./EnumList";
import './style.css';
import {Id} from "../../../../../API/types";


type EnumPopoverProps = {
    propertyId: Id;
}

export const EnumPopover: React.FC<EnumPopoverProps> = ({propertyId}) => {
	return (
        <Popover
            placement="rightTop"
            trigger='click'
            content={<EnumList propertyId={propertyId}/>}
            destroyTooltipOnHide={true}
            overlayClassName='enum-popover-overlay'
        >
            <Button type="text" style={{float: 'right'}}>
                <CaretRightOutlined/>
            </Button>
        </Popover>
	)
}