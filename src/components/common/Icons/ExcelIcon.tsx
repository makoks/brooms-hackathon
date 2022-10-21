import React from 'react'
import Icon from "@ant-design/icons";
import {Vector} from "./Vector";


type ExcelIconProps = {
	disabled: boolean;
};

export const ExcelIcon: React.FC<ExcelIconProps> = ({disabled, ...props}) => {
	return (
        <Icon component={Vector} style={{color: !disabled ? '#00adb5' : 'lightgray'}} {...props}/>
	)
}