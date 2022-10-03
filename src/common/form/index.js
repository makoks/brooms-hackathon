export const requiredRules = {
	required: true,
	message: 'Это обязательное поле'
}

export const emailRules = {
	type: 'email',
	message: 'Почта введена некорректно'
}

export const maxLengthRule = (len) => ({
	max: len,
	message: 'Превышена максимальная длина'
})

// export const phoneNumberRules = {
// 	pattern: /^((\d)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
// 	message: 'Номер телефона введен некорректно'
// }