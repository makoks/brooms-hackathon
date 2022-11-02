import React from 'react'
import {Divider, Space, Statistic} from "antd";


type StaticInfoProps = {
    info: {
        title: string;
        value: string | undefined;
    }[];
}

const StaticInfo: React.FC<StaticInfoProps> = ({info}) => {
    return (
        <Space>
            {info.map((v, i) => (
                <>
                    <Statistic title={v.title} value={v.value ?? '—'} />
                    {i !== info.length - 1 && <Divider type='vertical'/>}
                </>
            ))}
        </Space>
    )
}

export default StaticInfo