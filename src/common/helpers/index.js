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

export const getValueViewByPropType = (propType, value) => {
	if (!value) return '—'

	switch (propType) {
		case 'ENUM':
			return value.name

		default:
			return value
	}
}