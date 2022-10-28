import React from 'react'
import {Button} from "antd";
import ToCompareButton from "./ToCompareButton/ToCompareButton";
import {DeleteOutlined} from "@ant-design/icons";


type ActionBlockProps = {
    inCompareList: boolean;
    onAddToCompareList: () => void;
    onRemoveFromCompareList: () => void;
    compareDisabled: boolean;
    onDelete: () => Promise<void>;
    deleting: boolean;
}

export const ActionBlock: React.FC<ActionBlockProps> = ({
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
                onClick={() => onDelete()}
                loading={deleting}
                icon={<DeleteOutlined style={{color: 'red'}}/>}
            />
        </div>
    )
}