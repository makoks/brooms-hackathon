import React, {FocusEventHandler, KeyboardEventHandler, useEffect, useRef} from 'react'
import {Input, InputRef, Spin, Typography} from "antd";


type EditingTextByDoubleClickProps = {
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    value: string | undefined;
    onChange: React.Dispatch<React.SetStateAction<string | undefined>>;
    onBlur: Function;
    loading: boolean;
}

export const EditingTextByDoubleClick: React.FC<EditingTextByDoubleClickProps> = ({
                                                                                      isEdit,
                                                                                      setIsEdit,
                                                                                      value,
                                                                                      onChange,
                                                                                      onBlur,
                                                                                      loading
                                                                                  }) => {
    const inputRef = useRef<InputRef>(null)

    useEffect(() => {
        inputRef?.current?.focus({cursor: 'end'})
    }, [isEdit])

    return (
        <div>
            {isEdit ? (
                <Input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onBlur={onBlur as FocusEventHandler<HTMLInputElement>}
                    suffix={loading ? <Spin size='small'/> : <></>}
                    onPressEnter={onBlur as KeyboardEventHandler<HTMLInputElement>}
                    ref={inputRef}
                />
            ) : (
                <div onDoubleClick={() => setIsEdit(true)}>
                    <Typography.Text>
                        {value}
                    </Typography.Text>
                </div>
            )}
        </div>
    )
}