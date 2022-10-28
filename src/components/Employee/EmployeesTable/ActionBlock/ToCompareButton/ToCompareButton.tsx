import React from 'react'
import {Button} from "antd";


type ToCompareButtonProps = {
    inCompareList: boolean;
    onAdd: () => void;
    onRemove: () => void;
    disabled: boolean;
}

const ToCompareButton: React.FC<ToCompareButtonProps> = ({inCompareList, onAdd, onRemove, disabled}) => {
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