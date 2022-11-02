import React, {Key, useEffect, useState} from 'react';
import {Button, Layout, message, Space} from 'antd';
import {ContentHeader} from '../components';
import EmployeesTable from "../components/Employee/EmployeesTable/EmployeesTable";
import CreateEmployeeModal from "../components/Employee/CreateEmployeeModal/CreateEmployeeModal";
import {useEmployees} from "../hooks";
import {employeesAPI} from "../API/API";
import {ExcelIcon} from "../components/common/Icons/ExcelIcon";
import {downloadExcel, setFilterParams, setSorterParams} from "../common/helpers";
import {FilterParam, SortParam} from "../components/Employee/types";
import {SorterResult} from "antd/es/table/interface";
import {EmployeeForTable} from "../hooks/types";

export type SorterHandlerParams = {
    columnKey: Key | undefined;
    order: 'ascend' | 'descend';
};

export const Home = () => {
    const {loading, employees, deleteEmployee, deletingIds, createEmployee} = useEmployees();
    const [isExcelLoading, setIsExcelLoading] = useState(false);
    const [isExcelDisabled, setIsExcelDisabled] = useState(loading);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filters, setFilters] = useState<FilterParam[]>([]);
    const [sorters, setSorters] = useState<SortParam[]>([]);

    const setFiltersHandler = (filters: Record<string, string[] | null>) => {
        setFilterParams(filters, setFilters);
    }

    const setSortersHandler = (sorter: SorterResult<EmployeeForTable> | SorterResult<EmployeeForTable>[]) => {
        setSorterParams(sorter, sorters, setSorters);
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }

    const excelLoad = async () => {
        setIsExcelLoading(true)
        employeesAPI.excelLoad({filterParams: filters, sortParams: sorters})
            .then((res) => {
                downloadExcel(res.data, 'Сотрудники')
            })
            .catch(() => message.error('При выгрузке произошла ошибка :('))
            .finally(() => setIsExcelLoading(false))
    }

    useEffect(() => {
        setIsExcelDisabled(loading)
    }, [loading])

    return (
        <Layout>
            <ContentHeader title='Сотрудники'/>
            <Layout.Content style={{margin: '27px 34px'}}>
                <Space align='center' style={{marginBottom: 16}}>
                    <Button onClick={showModal} type="primary">
                        Добавить сотрудника
                    </Button>
                    <Button
                        icon={<ExcelIcon disabled={isExcelDisabled}/>}
                        size='large'
                        type='text'
                        onClick={excelLoad}
                        loading={isExcelLoading}
                        disabled={isExcelDisabled}
                    />
                </Space>
                <EmployeesTable
                    employeesLoading={loading}
                    employees={employees}
                    deleteEmployee={deleteEmployee}
                    deletingIds={deletingIds}
                    setFilters={setFiltersHandler}
                    setSorters={setSortersHandler}
                    setIsExcelDisabled={setIsExcelDisabled}
                />
                <CreateEmployeeModal
                    isModalVisible={isModalVisible}
                    onCancel={hideModal}
                    createEmployee={createEmployee}
                    loading={loading}
                />
            </Layout.Content>
        </Layout>
    );
};
