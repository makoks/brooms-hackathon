import React, {useState} from 'react'
import {
    Avatar,
    Button,
    Col,
    Form,
    Input,
    message,
    Modal,
    Row,
    Select,
    Space,
    Typography,
    Upload,
    UploadFile
} from "antd";
import {AvatarPreview} from "../../../images";
import {emailRules, maxLengthRule, requiredRules} from "../../../common/form";
import {useReferenceBooks} from "../../../hooks";
import './style.css'
import {NewEmployeeData} from "../../../hooks/types";


const mask = (inputValue: string) => {
    const value = inputValue.replace(/\D+/g, "")
    if (value.length === 0) return ''

    const numberLength = 11
    let result = "+"

    for (let i = 0; i < value.length && i < numberLength; i++) {
        switch (i) {
            case 1 :
                result += ' ('
                break;
            case 4:
                result += ") ";
                break;
            case 7:
                result += "-";
                break;
            case 9:
                result += "-";
                break;
            default:
                break;
        }
        result += value[i];
    }
    return result;
}

const {Option} = Select;

type CreateEmployeeModalProps = {
    isModalVisible: boolean;
    onCancel: Function;
    createEmployee: (data: NewEmployeeData, onSuccess: Function) => Promise<void>;
    loading: boolean;
}

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({
                                                                     isModalVisible,
                                                                     onCancel,
                                                                     createEmployee,
                                                                     loading
                                                                 }) => {
    const {loading: referenceBooksLoading, departments, positions, projects, roles} = useReferenceBooks();
    const fieldNames = ['fioUser', 'email', 'telephone', 'idDepartment', 'idPosition', 'idRole', 'idProject'];
    const [form] = Form.useForm();
    const [avatarPreview, setAvatarPreview] = useState(AvatarPreview);
    const [fileList, setFileList] = useState<UploadFile<any>[] | undefined>([]);

    const onUploadChange = ({fileList: newFileList}: { fileList: UploadFile<any>[] | undefined }) => {
        if (newFileList?.length) {
            const isAvailableSize = (newFileList[0]?.size ?? 0) / 1024 / 1024 <= 5;
            const isAvailableType = newFileList[0].type === 'image/png' || newFileList[0].type === 'image/jpg';
            const response = `${!isAvailableType ? 'Файл должен быть в формате jpg или png.\n' : ''}
							${!isAvailableSize ? 'Размер файла должен быть не больше 5 мб.' : ''}`;

            setFileList([{
                ...newFileList[0],
                status: isAvailableSize && isAvailableType ? 'done' : 'error',
                response,
            }]);
            setAvatarPreview(URL.createObjectURL(newFileList[0]?.originFileObj as Blob) ?? AvatarPreview)
        } else {
            setFileList([])
            setAvatarPreview(AvatarPreview)
        }
    }

    const handleCreateEmployee = async (data: NewEmployeeData) => {
        const userDataWithAvatar = fileList?.length ? {...data, avatar: fileList[0].originFileObj} : data
        createEmployee(userDataWithAvatar, () => {
            onCancel()
            form.resetFields()
            setFileList([])
            setAvatarPreview(AvatarPreview)
        })
    }

    const onNumberChange = (e: React.FormEvent<HTMLInputElement>) => {
        form.setFieldsValue({telephone: mask(e.currentTarget.value)})
    }

    return (
        <Modal
            title="Добавление сотрудника"
            visible={isModalVisible}
            onCancel={() => onCancel()}
            confirmLoading={loading}
            cancelText='Отмена'
            onOk={() => {
                if (fileList?.length && fileList[0].status === 'error') {
                    message.error(fileList[0].response)
                } else {
                    form.validateFields(fieldNames)
                        .then(() => handleCreateEmployee(form.getFieldsValue(fieldNames)))
                }
            }}
            style={{minWidth: 800}}
            destroyOnClose={true}
            className='create-employee-modal'
        >
            <Form form={form}>
                <Row justify='space-between'>
                    <Col span={16} className='form'>
                        <Form.Item name="fioUser" label="ФИО" rules={[requiredRules, maxLengthRule(250)]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="email" label="Почта" rules={[requiredRules, emailRules, maxLengthRule(250)]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="telephone" label="Телефон" rules={[requiredRules, maxLengthRule(20)]}>
                            <Input onChange={onNumberChange}/>
                        </Form.Item>
                        <Form.Item name="idDepartment" label='Отдел' rules={[requiredRules]}>
                            <Select loading={referenceBooksLoading}>
                                {departments?.map(dep => (
                                    <Option key={dep.id} value={dep.id}>{dep.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name='idPosition' label="Должность" rules={[requiredRules]}>
                            <Select loading={referenceBooksLoading}>
                                {positions?.map(pos => (
                                    <Option key={pos.id} value={pos.id}>{pos.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="idRole" label='Роль' rules={[requiredRules]}>
                            <Select loading={referenceBooksLoading}>
                                {roles?.map(role => (
                                    <Option key={role.id} value={role.id}>{role.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="idProject" label='Проект'>
                            <Select loading={referenceBooksLoading}>
                                {projects?.map(proj => (
                                    <Option key={proj.id} value={proj.id}>{proj.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} className='upload'>
                        <Space direction='vertical' align='center' className='upload-avatar'>
                            <Avatar src={avatarPreview} size={140}/>
                            <Upload
                                name="avatar"
                                accept='image/png, image/jpg'
                                fileList={fileList}
                                maxCount={1}
                                onChange={onUploadChange}
                                beforeUpload={(file) => {
                                    const isAvailableSize = file.size / 1024 / 1024 <= 5
                                    const isAvailableType = file.type === 'image/png' || file.type === 'image/jpg'

                                    if (!isAvailableSize) {
                                        message.error('Размер файла должен быть не больше 5 мб')
                                    }
                                    if (!isAvailableType) {
                                        message.error('Файл должен быть в формате jpg или png')
                                    }

                                    return !isAvailableType || !isAvailableSize
                                }}
                            >
                                <Typography.Text className='message'>Размер файла должен быть не больше 5
                                    мб</Typography.Text>
                                <Button className='button'>Выбрать файл</Button>
                            </Upload>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default CreateEmployeeModal