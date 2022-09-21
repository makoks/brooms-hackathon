import React from 'react'
import {Input, Spin, Typography} from "antd";


export const EditingTextByDoubleClick = ({isEdit, setIsEdit, value, onChange, onBlur, loading}) => {
	return (
        <div>
            {isEdit ? (
                <Input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    suffix={loading ? <Spin size='small'/> : <></>}
                />
            ) : (
                <Typography.Text onDoubleClick={() => setIsEdit(true)}>
                    {value}
                </Typography.Text>
            )}
        </div>
	)
}