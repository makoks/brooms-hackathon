import React, {useState} from 'react'
import {Avatar, Col, Row, Space} from "antd";
import {getShortName} from "../../../../common/helpers";
import {CloseCircleTwoTone, UserOutlined} from "@ant-design/icons";
import {AvatarPreview} from "../../../../images";
import {EmployeeForPage} from "../../../../hooks/types";
import {Id} from "../../../../API/types";


type ComparisonPersonsProps = {
    employees: EmployeeForPage[];
    removeFromCompareList: (id: Id) => void;
};

type PersonProps = {
    avatar: string;
    id: Id;
    fio: string;
    removeFromCompareList: Function
}

const ComparisonPersons: React.FC<ComparisonPersonsProps> = ({employees, removeFromCompareList}) => {

    return (
        <Row gutter={24} justify='space-around'>
            {employees.map(employee => (
                <Col key={employee.id}>
                    <Person
                        id={employee.id}
                        avatar={employee.avatarUrl ?? AvatarPreview}
                        fio={employee.fioUser}
                        removeFromCompareList={() => removeFromCompareList(employee.id)}
                    />
                </Col>
            ))}
        </Row>
    )
}

const Person: React.FC<PersonProps> = ({avatar, fio, removeFromCompareList}) => {
    const [showClose, setShowClose] = useState(false)

    return (
        <Space
            direction='vertical'
            align='center'
            onMouseEnter={() => setShowClose(true)}
            onMouseLeave={() => setShowClose(false)}
        >
            {showClose
                ? <CloseCircleTwoTone
                    twoToneColor='#FFA39E'
                    style={{fontSize: 32}}
                    onClick={() => removeFromCompareList()}
                />
                : <Avatar size={32} icon={<UserOutlined/>} src={avatar}/>
            }
            <span>{getShortName(fio)}</span>
        </Space>
    )
}

export default ComparisonPersons