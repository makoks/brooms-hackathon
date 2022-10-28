import {Avatar, Table} from 'antd';
import {NavLink} from "react-router-dom";
import React, {useContext} from "react";
import {tableLocale} from "../../../common/locale";
import {alphabetSort} from "../../../common/helpers";
import {CompareListContext} from "../../../providers/CompareListProvider";
import {useReferenceBooks} from "../../../hooks";
import {AvatarPreview} from "../../../images";
import './style.css'
import {ActionBlock} from "./ActionBlock/ActionBlock";
import {EmployeeForTable} from "../../../hooks/types";
import {ColumnsType} from "antd/es/table/interface";
import {SorterHandlerParams} from "../../../pages/Home";
import {Id} from "../../../API/types";

type EmployeesTableProps = {
    employees: EmployeeForTable[];
    employeesLoading: boolean;
    deleteEmployee: (id: Id) => Promise<void>;
    deletingIds: Id[];
    setFilters?: (filters: Record<string, string[] | null>) => void;
    setSorters?: (sorters: SorterHandlerParams) => void;
    setIsExcelDisabled?: (disabled: boolean) => void;
}

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
                                                                  employees,
                                                                  employeesLoading,
                                                                  deleteEmployee,
                                                                  deletingIds,
                                                                  setFilters,
                                                                  setSorters,
                                                                  setIsExcelDisabled
                                                              }) => {
    const {loading: referenceBooksLoading, departments, positions, projects, roles} = useReferenceBooks()
    const {compareList, addToCompareList, removeFromCompareList} = useContext(CompareListContext)
    // const [tableParams, setTableParams] = useState({
    //     pagination: {
    //         showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} из ${total}`,
    //         showSizeChanger: true,
    //         defaultCurrent: 1,
    //         current: 1,
    //         pageSize: 10
    //     }
    // })

    const columns: ColumnsType<EmployeeForTable> = [
        {
            title: 'Аватар',
            dataIndex: 'avatarUrl',
            key: 'avatarUrl',
            render: (_, {avatarUrl}) => <Avatar size='large' src={avatarUrl ?? AvatarPreview}/>
        },
        {
            title: 'ФИО',
            dataIndex: 'fioUser',
            key: 'fioUser',
            render: (_, {id, fioUser}) => <NavLink to={`employee/${id}`}>{fioUser}</NavLink>,
            // filters: employees.map(e => ({text: e.fioUser, value: e.fioUser})),
            // filterSearch: true,
            // onFilter: (value, record) => record.fioUser === value,
            sorter: (a, b) => alphabetSort(a.fioUser, b.fioUser),
        },
        {title: 'Почта', dataIndex: 'email', key: 'email'},
        {title: 'Телефон', dataIndex: 'telephone', key: 'telephone'},
        {
            title: 'Отдел',
            dataIndex: ['userDepartment', 'name'],
            key: 'userDepartment',
            filters: departments?.map(d => ({text: d.name, value: d.name})),
            onFilter: (value, record) => record.userDepartment.name === value,
        },
        {
            title: 'Должность',
            dataIndex: ['userPosition', 'name'],
            key: 'userPosition',
            filters: positions?.map(p => ({text: p.name, value: p.name})),
            onFilter: (value, record) => record.userPosition.name === value
        },
        {
            title: 'Роль',
            dataIndex: ['userRole', 'name'],
            key: 'userRole',
            filters: roles?.map(r => ({text: r.name, value: r.name})),
            onFilter: (value, record) => record.userRole.name === value
        },
        {
            title: 'Проект',
            dataIndex: ['userProject', 'name'],
            key: 'userProject',
            filters: projects?.map(p => ({text: p.name, value: p.name})),
            onFilter: (value, record) => record.userProject.name === value
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            colSpan: 2,
            align: 'left',
            render: (_, {id}) => (
                <ActionBlock
                    inCompareList={compareList?.includes(id)}
                    onAddToCompareList={() => addToCompareList(id)}
                    onRemoveFromCompareList={() => removeFromCompareList(id)}
                    compareDisabled={compareList.length === 6}
                    deleting={deletingIds.indexOf(id) !== -1}
                    onDelete={() => deleteEmployee(id)}
                />
            ),
            width: '13%'
        },
    ]

    return (
        <Table
            className='employees-table'
            rowKey={record => record.id}
            columns={columns}
            dataSource={employees}
            locale={tableLocale}
            loading={referenceBooksLoading || employeesLoading}
            onChange={(pagination, filters, sorters, {currentDataSource}) => {
                // setTableParams({
                //     ...tableParams,
                //     pagination: {
                //         ...tableParams.pagination,
                //         ...pagination,
                //         // total: currentDataSource.length,
                //     }
                // })
                setFilters?.(filters as Record<string, string[] | null>)
                setSorters?.(sorters as SorterHandlerParams)
                setIsExcelDisabled?.(currentDataSource.length < 1)
            }}
            // pagination={tableParams.pagination}
        />
    )
}

export default EmployeesTable