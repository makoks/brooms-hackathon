import React, {useEffect, useState} from 'react'
import moment from "moment";
import {dateLocale} from "../../../../../../common/locale";
import {DatePicker, Input, InputNumber, Select} from "antd";
import {propertiesAPI} from "../../../../../../API/API";


moment.locale('ru')

export const InputComponent = ({prop, onChange, value}) => {
	const [enumList, setEnumList] = useState([])
	const [loading, setLoading] = useState(false)

	const getEnumList = async () => {
		setLoading(true)
		const list = await propertiesAPI.getEnumList(prop.id)
		setEnumList(list)
		setLoading(false)
	}

	useEffect(() => {
		if (prop.type === 'ENUM') {
			getEnumList()
		}
	}, [prop.type])

	switch (prop.type) {
		case 'ENUM': {
			return (
				<Select
					size='small'
					style={{minWidth: 500}}
					value={value?.id}
					onChange={id => onChange(enumList.find(item => item.id === id))}
					loading={loading}
				>
					{enumList.map(item => (
						<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
					))}
				</Select>
			)
		}

		case 'NUMBER': {
			return (
				<InputNumber
					size='small'
					style={{minWidth: 500}}
					value={value}
					onChange={onChange}
				/>
			)
		}

		case 'DATE': {
			return (
				<DatePicker
					size='small'
					style={{minWidth: 500}}
					value={moment(value, dateLocale)}
					format={value => moment(value).format('DD.MM.YYYY')}
					onChange={value => onChange(value?.format(dateLocale))}
				/>
			)
		}

		default: {
			return (
				<Input
					size='small'
					style={{minWidth: 500}}
					value={value}
					onChange={e => onChange(e.target.value)}
				/>
			)
		}
	}
}