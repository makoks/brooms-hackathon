import React from 'react'
import {Button, Popover} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import {EnumList} from "./EnumList";
import './style.css'


export const EnumPopover = ({id}) => {
	return (
        <Popover
            placement="rightTop"
            trigger='click'
            content={<EnumList id={id}/>}
            destroyTooltipOnHide={true}
            overlayClassName='enum-popover-overlay'
        >
            <Button type="text" style={{float: 'right'}}>
                <CaretRightOutlined/>
            </Button>
        </Popover>
	)
}