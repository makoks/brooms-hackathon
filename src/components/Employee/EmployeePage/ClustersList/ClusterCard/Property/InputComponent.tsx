import React, {useEffect, useState} from 'react'
import moment from "moment";
import {dateLocale} from "../../../../../../common/locale";
import {DatePicker, Input, InputNumber, Select} from "antd";
import {propertiesAPI} from "../../../../../../API/API";
import {ClusterProperty, ClusterPropertyValue} from "../../../../types";


moment.locale('ru')

type InputComponentProps = {
	prop: ClusterProperty;
	onChange: (value: string | ClusterPropertyValue['enumValue'] | number | undefined) => void;
	value: string | ClusterPropertyValue['enumValue'] | number;
}

export const InputComponent: React.FC<InputComponentProps> = ({prop, onChange, value}) => {
	const [enumList, setEnumList] = useState<ClusterPropertyValue['enumValue'][]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const getEnumList = async () => {
			setLoading(true)
			const list = await propertiesAPI.getEnumList(prop.id)
			setEnumList(list)
			setLoading(false)
		}

		if (prop.type === 'ENUM') {
			getEnumList()
		}
	}, [prop.type, prop.id])

	switch (prop.type) {
		case 'ENUM': {
			return (
				<Select
					size='small'
					style={{minWidth: 500}}
					value={typeof value !== 'string' && typeof value !== 'number' ? value?.id : undefined}
					onChange={id => onChange(enumList.find(item => item?.id === id) ?? '1')}
					loading={loading}
				>
					{enumList.map(item => (
						<Select.Option key={item?.id} value={item?.id}>{item?.name}</Select.Option>
					))}
				</Select>
			)
		}

		case 'NUMBER': {
			return (
				<InputNumber
					size='small'
					style={{minWidth: 500}}
					value={typeof value === 'number' ? value : undefined}
					onChange={onChange}
				/>
			)
		}

		case 'DATE': {
			return (
				<DatePicker
					size='small'
					style={{minWidth: 500}}
					value={typeof value === 'string' ? moment(value, dateLocale) : undefined}
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
					value={typeof value === 'string' ? value : undefined}
					onChange={e => onChange(e.target.value)}
				/>
			)
		}
	}
}