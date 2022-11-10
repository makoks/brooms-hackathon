import React, {useContext, useEffect, useState} from 'react';
import {Empty, Layout, message, TreeSelect} from 'antd';
import {ContentHeader} from '../components';
import ComparisonHeaderBlock from "../components/Comparison/ComparisonHeaderBlock/ComparisonHeaderBlock";
import {employeesAPI} from "../API/API";
import {CompareListContext} from "../providers/CompareListProvider";
import ComparisonClusters from "../components/Comparison/ComparisonClusters/ComparisonClusters";
import {getPropValueByPropType} from "../common/helpers";
import {UserClusters} from "../components/Employee/types";
import {ComparisonCluster, ComparisonProperty} from "../components/Comparison/types";


const createClusters = (employees: UserClusters[], onlyDifferent: boolean, selectedProps: string[]) => {
    const clusters: ComparisonCluster[] = []

    employees.forEach(employee => {
        employee.clusters.forEach(c => {
            const cluster = clusters.find(cl => cl.title === c.name)
            if (!cluster) {
                clusters.push({
                    id: `cluster-${c.id}`,
                    definition: c.definition,
                    title: c.name,
                    props: c.properties.map(p => {
                        const value = p.value[getPropValueByPropType(p.type)]
                        return {
                            id: `prop-${p.id}`,
                            title: p.name,
                            values: {
                                [employee.user.id]: typeof value !== 'string' && typeof value !== 'number' ? value?.name : value
                            }
                        }
                    })
                })
            } else {
                c.properties.forEach(p => {
                    const prop = cluster.props.find(pr => pr.title === p.name)
                    const value = p.value[getPropValueByPropType(p.type)]
                    if (!prop) {
                        cluster.props.push({
                            id: `prop-${p.id}`,
                            title: p.name,
                            values: {
                                [employee.user.id]: typeof value !== 'string' && typeof value !== 'number' ? value?.name : value
                            }
                        })
                    } else {
                        prop.values[employee.user.id] = typeof value !== 'string' && typeof value !== 'number' ? value?.name : value
                    }
                })
            }
        })
    })

    if (onlyDifferent || selectedProps.length > 0) {
        clusters.forEach(cluster => {
            cluster.props = cluster.props.filter(prop => {
                const equal = isAllValuesEqual(prop)
                const len = selectedProps.length
                const includes = selectedProps.includes(prop.id)
                return (onlyDifferent && !equal && len > 0 && includes)
                    || (onlyDifferent && !equal && !len)
                    || (!onlyDifferent && includes)
            })
        })
    }
    return clusters
}

const isAllValuesEqual = (prop: ComparisonProperty) => {
    return new Set(Object.values(prop.values)).size === 1
}

export const Comparison = () => {
    const [onlyDifferent, setOnlyDifferent] = useState(false);
    const [employees, setEmployees] = useState<UserClusters[]>([]);
    const {compareList, removeFromCompareListByIndex} = useContext(CompareListContext);
    const [initClusters, setInitClusters] = useState<ComparisonCluster[]>([]);
    const [clusters, setClusters] = useState<ComparisonCluster[]>([]);
    const [selectedProps, setSelectedProps] = useState([]);

    useEffect(() => {
        setOnlyDifferent(false);
        setInitClusters(createClusters(employees, false, []));
    }, [employees])

    useEffect(() => {
        setClusters(createClusters(employees, onlyDifferent, selectedProps))
    }, [employees, onlyDifferent, selectedProps])

    // Получение сотрудников по содержащимся в списке сравнения id
    useEffect(() => {
        if (compareList.length === 0) {
            setEmployees([])
        } else {
            const getEmployees = async () => {
                const res = await employeesAPI.getEmployeesClustersByIds(compareList)
                res.data = res.data.filter((c, index) => {
                    if (c === null) {
                        removeFromCompareListByIndex(index)
                        return false
                    }
                    return true
                })
                setEmployees(res.data)
            }

            getEmployees()
                .catch(() => message.error('Не удалось получить свойства сотрудника :('))
        }
    }, [compareList, removeFromCompareListByIndex])

    return (
        <Layout>
            <ContentHeader title='Сравнение' paddingBottom={true}>
                <TreeSelect
                    value={selectedProps}
                    onChange={setSelectedProps}
                    style={{width: '100%', marginBottom: 20}}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder='Выберите свойства'
                    fieldNames={{label: 'title', value: 'id', children: 'props'}}
                    treeData={initClusters}
                    showSearch={false}
                    treeDefaultExpandAll
                    treeCheckable
                />
                <ComparisonHeaderBlock
                    employees={employees.map(e => e.user)}
                    onlyDifferent={onlyDifferent}
                    setOnlyDifferent={setOnlyDifferent}
                />
            </ContentHeader>
            <Layout.Content style={{margin: '27px 34px'}}>
                {!clusters.every(c => c.props.length === 0) ? <ComparisonClusters employees={employees} clusters={clusters}/> :
                    <Empty description={'Нет свойств, удовлетворяющих фильтрам'}/>}
            </Layout.Content>
        </Layout>
    );
};
