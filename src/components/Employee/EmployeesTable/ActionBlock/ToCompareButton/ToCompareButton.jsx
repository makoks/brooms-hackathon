import React from 'react'
import {Button} from "antd";


const ToCompareButton = ({inCompareList, onAdd, onRemove, disabled}) => {
	const handleClick = () => {
		if (inCompareList) {
			onRemove()
		} else {
			onAdd()
		}
	}

	return (
		<Button
			onClick={handleClick}
			disabled={!inCompareList && disabled}
			type={inCompareList ? 'default' : 'primary'}
			style={{flex: 1}}
		>
			{inCompareList ? 'Убрать из сравнения' : 'Добавить в сравнение'}
		</Button>
	)
}

export default ToCompareButton