import React from 'react'
import {Button, Popover} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import {EnumList} from "./EnumList";


export const EnumPopover = ({id}) => {
	return (
        <Popover
            placement="rightTop"
            trigger='click'
            content={<EnumList id={id}/>}
            destroyTooltipOnHide={true}
        >
            <Button type="text" style={{float: 'right'}}>
                <CaretRightOutlined/>
            </Button>
        </Popover>
	)
}