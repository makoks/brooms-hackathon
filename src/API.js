// const API_URL = 'https://brooms.herokuapp.com';

export const API = {
	characters: async () => {
		return await [
			{
				id: '1',
				nickname: 'Тестовый персонаж',
				about: 'Тестовый персонаж без всякой предыстории и свойств)))',
				avatar: 'https://picsum.photos/200',
				registerDate: new Date('22-12-2001'),
				race: 'Орк какой-то',
				class: 'Убийца',
				guild: 'Нечистая сила'
			},
			{
				id: '2',
				nickname: 'Какой-то her0',
				about: 'ее персонаж опять же без свойств',
				avatar: 'https://picsum.photos/200',
				registerDate: new Date('01-01-2022'),
				race: 'Эльф',
				class: 'Лучник',
				guild: 'Парикмахерская'
			},
			{
				id: '3',
				nickname: 'Бильбо',
				about: 'Отправился воровать камень у дракона',
				avatar: 'https://picsum.photos/200',
				registerDate: new Date('02-02-2018'),
				race: 'Хоббит',
				class: 'Вор',
				guild: 'Садоводы'
			},
		]
	},
};
