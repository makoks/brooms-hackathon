import {DatePicker, Input, InputNumber, Select} from "antd";

export const getShortName = (fio) => {
	const [surname, name, patronymic] = fio.split(' ')
	return `${surname} ${name ? `${name[0]}.` : ''} ${patronymic ? `${patronymic[0]}.` : ''}`
}

export const alphabetSort = (a, b) => {
	const nameA = a.toLowerCase()
	const nameB = b.toLowerCase()
	if (nameA < nameB)
		return -1
	if (nameA > nameB)
		return 1
	return 0
}

export const getPropValueByPropType = (propType) => {
	switch (propType) {
		case 'ENUM':
			return 'enumValue'

		case 'NUMBER':
			return 'numberValue'

		case 'DATE':
			return 'dateTimeValue'

		default:
			return 'stringValue'
	}
}

export const getInputComponentByPropType = (propType) => {
	switch (propType) {
		case 'ENUM':
			return Select

		case 'NUMBER':
			return InputNumber

		case 'DATE':
			return DatePicker

		default:
			return Input
	}
}