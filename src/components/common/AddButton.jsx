import React from 'react'
import {Button} from "antd";


export const AddButton = ({onClick}) => {
	return (
		<Button
			type='primary'
			block
			style={{borderRadius: 0}}
			onClick={onClick}
		>
			+ Добавить
		</Button>
	)
}