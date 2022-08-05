export const getShortName = (person) => {
	return `${person.surname} ${person.name[0]}. ${person.patronymic[0]}.`
}