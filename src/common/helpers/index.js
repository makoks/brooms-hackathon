import {DatePicker, Input, InputNumber, Select} from "antd";

export const getShortName = (fio) => {
	const [surname, name, patronymic] = fio.split(' ')
	return `${surname} ${name[0]}. ${patronymic[0]}.`
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
		case 'Enum':
			return 'enumValue'

		case 'Integer':
			return 'numberValue'

		case 'Date':
			return 'dateTimeValue'

		default:
			return 'stringValue'
	}
}

export const getInputComponentByPropType = (propType) => {
	switch (propType) {
		case 'Enum':
			return Select

		case 'Integer':
			return InputNumber

		case 'Date':
			return DatePicker

		default:
			return Input
	}
}