import React from 'react'
import {Button, Form, FormInstance, Input, Select} from "antd";
import {requiredRules} from "../../../common/form";
import {NewPropertyData, PropertyTypeObj} from "../types";


const {Option} = Select

type CreatePropertyFormProps = {
    onFinish: (values: NewPropertyData) => void;
    loading: boolean;
    types: PropertyTypeObj[];
    form: FormInstance<NewPropertyData>;
}

export const CreatePropertyForm: React.FC<CreatePropertyFormProps> = ({
                                                                          form,
                                                                          onFinish,
                                                                          loading,
                                                                          types,
                                                                      }) => {
    return (
        <Form style={{padding: '0 16px'}} form={form} onFinish={onFinish}>
            <Form.Item rules={[requiredRules]} name='name'>
                <Input placeholder='Название'/>
            </Form.Item>
            <Form.Item rules={[requiredRules]} name='type'>
                <Select placeholder='Типа свойства' defaultValue='STRING'>
                    {types.map(t => (
                        <Option value={t.type} key={t.type}>{t.title}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType="submit" loading={loading}>
                    Создать
                </Button>
            </Form.Item>
        </Form>
    )
}