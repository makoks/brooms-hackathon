import React from 'react'
import {Collapse, Space, Typography} from "antd";
import {Property} from "./ClusterCard/Property/Property";
import {Cluster} from "../../types";
import {Id} from "../../../../API/types";


const {Panel} = Collapse

type ClusterListProps = {
    clusters: Cluster[];
    isEdit: boolean;
    editableClusters: Cluster[];
    onPropChange: (
        clusterId: string,
        propId: string,
        propType: string,
        value: (string | number | { id: Id, name: string } | null | undefined)
    ) => void;
}

const ClustersList: React.FC<ClusterListProps> = ({clusters, isEdit, editableClusters, onPropChange}) => {
    const data = isEdit ? editableClusters : clusters

    return (
        <Space size='middle' direction='vertical' style={{width: '100%'}}>
            {data.map(cluster => (
                <Collapse key={`cluster-${cluster.id}`} defaultActiveKey={[cluster.id]}>
                    <Panel key={`panel-${cluster.id}`} header={cluster.name}>
                        <Typography.Paragraph>{cluster.definition}</Typography.Paragraph>
                        <Space size='large' direction='vertical' style={{width: '100%'}}>
                            {cluster.properties.map(prop => (
                                <Property
                                    key={prop.id}
                                    prop={prop}
                                    isEdit={isEdit}
                                    onPropChange={value => onPropChange(cluster.id, prop.id, prop.type, value)}
                                />
                            ))}
                        </Space>
                    </Panel>
                </Collapse>
            ))}
        </Space>
    )
}

export default ClustersList