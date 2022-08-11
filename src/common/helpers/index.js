export const getShortName = (person) => {
	return `${person.surname} ${person.name[0]}. ${person.patronymic[0]}.`
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