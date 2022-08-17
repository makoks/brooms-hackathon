export const requiredRules = {
	required: true,
	message: 'Это обязательное поле'
}

export const emailRules = {
	type: 'email',
	message: 'Почта введена некорректно'
}

export const phoneNumberRules = {
	pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
	message: 'Номер телефона введен некорректно'
}