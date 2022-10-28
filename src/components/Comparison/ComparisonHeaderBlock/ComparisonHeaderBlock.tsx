import React, {useContext, useState} from 'react'
import {Button, Col, Modal, Row, Space, Switch} from "antd";
import ComparisonPersons from "./ComparisonPersons/ComparisonPersons";
import {CompareListContext} from "../../../providers/CompareListProvider";
import EmployeesTable from "../../Employee/EmployeesTable/EmployeesTable";
import {useEmployees} from "../../../hooks";
import {EmployeeForPage} from "../../../hooks/types";


type ComparisonHeaderBlockProps = {
    employees: EmployeeForPage[];
    onlyDifferent: boolean;
    setOnlyDifferent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComparisonHeaderBlock: React.FC<ComparisonHeaderBlockProps> = ({employees, onlyDifferent, setOnlyDifferent}) => {
    const {loading, employees: allEmployees, deleteEmployee, deletingIds} = useEmployees()
    const {removeFromCompareList} = useContext(CompareListContext)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Row justify='space-between' align='middle' gutter={24}>
                <Col flex='224px'>
                    <Space size='small'>
                        Только различия:
                        <Switch
                            checkedChildren="вкл"
                            unCheckedChildren="выкл"
                            checked={onlyDifferent}
                            onChange={setOnlyDifferent}
                        />
                    </Space>
                </Col>
                <Col flex='auto'>
                    <ComparisonPersons employees={employees} removeFromCompareList={removeFromCompareList}/>
                </Col>
                <Col flex='194px'>
                    <Button
                        type='primary'
                        disabled={employees.length === 6}
                        onClick={showModal}
                    >
                        Добавить сотрудника
                    </Button>
                </Col>
            </Row>
            <Modal
                title="Сотрудники"
                visible={isModalVisible}
                onCancel={hideModal}
                footer={null}
                width='fit-content'
            >
                <EmployeesTable
                    employeesLoading={loading}
                    employees={allEmployees}
                    deleteEmployee={deleteEmployee}
                    deletingIds={deletingIds}
                />
            </Modal>
        </>
    )
}

export default ComparisonHeaderBlock