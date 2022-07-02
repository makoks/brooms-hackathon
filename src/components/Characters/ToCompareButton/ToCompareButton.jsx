import React from 'react'
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
				? 'Убрать из сравнения'
				: 'Добавить в сравнение'
		}</Button>
	)
}

export default ToCompareButton