import React, {useEffect, useRef} from 'react'
import {Input, Spin, Typography} from "antd";


export const EditingTextByDoubleClick = ({isEdit, setIsEdit, value, onChange, onBlur, loading}) => {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef?.current?.focus({cursor: 'end'})
	}, [isEdit])

	return (
        <div>
            {isEdit ? (
                <Input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    suffix={loading ? <Spin size='small'/> : <></>}
                    onPressEnter={onBlur}
                    ref={inputRef}
                />
            ) : (
                <Typography.Text onDoubleClick={() => setIsEdit(true)}>
                    {value}
                </Typography.Text>
            )}
        </div>
	)
}