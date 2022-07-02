import React from 'react'
import {CloseSquareOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {Button} from "antd";


const ToCompareButton = ({inCompareList, onAdd, onRemove}) => {
	const handleClick = () => {
		if (inCompareList) {
			onRemove()
		} else {
			onAdd()
		}
	}

	return (
		<Button onClick={handleClick}>{
			inCompareList
				? <CloseSquareOutlined />
				: <UnorderedListOutlined/>
		}</Button>
	)
}

export default ToCompareButton