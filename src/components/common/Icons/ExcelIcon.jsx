import React from 'react'
import Icon from "@ant-design/icons";
import {Vector} from "./Vector";


export const ExcelIcon = ({disabled, ...props}) => {
	return (
        <Icon component={Vector} style={{color: !disabled ? '#00adb5' : 'lightgray'}} {...props}/>
	)
}