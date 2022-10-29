import React, {useState} from 'react'
import {Button, Input, message, Space, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {clustersAPI} from "../../../API/API";
import './style.css';
import {Id} from "../../../API/types";

const {Paragraph} = Typography

type ClusterDefinitionProps = {
    id: Id;
    definition: string | undefined;
}

export const ClusterDefinition: React.FC<ClusterDefinitionProps> = ({id, ...props}) => {
    const [definition, setDefinition] = useState(props.definition)
    const [isEdit, setIsEdit] = useState(false)
    const [saving, setSaving] = useState(false)

    const changeDefinition = () => {
        setSaving(true)
        clustersAPI.editCluster(id, undefined, definition)
            .then(() => {
                setSaving(false)
                setIsEdit(false)
            })
            .catch(() => message.error('Не удалось изменить описание'))
    }

    return (
        <>
            {isEdit ? (
                <Space direction='vertical' size='small' className='definition-edit' style={{width: '100%'}}>
                    <Input.TextArea value={definition} onChange={e => setDefinition(e.target.value)}
                                    style={{width: '100%'}} autoSize={true}/>
                    <Button onClick={changeDefinition} type='primary' loading={saving}>Сохранить</Button>
                </Space>
            ) : (
                <>
                    {definition ? (
                        <div onDoubleClick={() => setIsEdit(true)}>
                            <Paragraph style={{marginBottom: 0}}>
                                {definition}
                            </Paragraph>
                        </div>
                    ) : (
                        <Button icon={<PlusOutlined/>} type="default" onClick={() => setIsEdit(true)}>
                            Добавить описание
                        </Button>
                    )}
                </>
            )}
        </>
    )
}