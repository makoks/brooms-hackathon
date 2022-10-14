import React from 'react'
import {Button} from "antd";
import ToCompareButton from "./ToCompareButton/ToCompareButton";
import {DeleteOutlined} from "@ant-design/icons";


export const ActionBlock = ({
	                            inCompareList,
	                            onAddToCompareList,
	                            onRemoveFromCompareList,
	                            compareDisabled,
	                            onDelete,
	                            deleting
                            }) => {
	return (
		<div style={{display: 'flex', justifyContent: 'space-between', width: '100%', gap: 16}}>
			<ToCompareButton
				inCompareList={inCompareList}
				onAdd={onAddToCompareList}
				onRemove={onRemoveFromCompareList}
				disabled={compareDisabled}
			/>
			<Button
				onClick={onDelete}
				loading={deleting}
				icon={<DeleteOutlined style={{color: 'red'}}/>}
			/>
		</div>
	)
}