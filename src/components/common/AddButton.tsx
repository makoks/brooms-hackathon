import React, {MouseEventHandler} from 'react'
import {Button} from "antd";


type AddButtonProps = {
	onClick?: MouseEventHandler<HTMLElement>;
}

export const AddButton: React.FC<AddButtonProps> = ({onClick}) => {
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