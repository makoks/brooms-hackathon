import React, {useEffect, useState} from 'react'
import {propertiesAPI} from "../../../../../API/API";
import {Space} from "antd";
import {Loader} from "../../../../common/Loader";


export const EnumList = ({id}) => {
	const [loading, setLoading] = useState(false)
	const [enumList, setEnumList] = useState([])

	useEffect(() => {
		const getEnumList = async () => {
			setEnumList(await propertiesAPI.getEnumList(id))
		}

		setLoading(true)
		getEnumList()
			.finally(() => setLoading(false))
	}, [id])

	return (
		<Space direction="vertical" size='middle' style={{width: 'calc((100vw - 300px) / 3)', padding: '12px 16px'}}>
			{loading
				? <div style={{display: 'flex', justifyContent: 'center'}}><Loader/></div>
				: <>{enumList.map(e => <div>{e.name}</div>)}</>
			}
		</Space>
	)
}