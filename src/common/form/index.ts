import { Rule } from "antd/lib/form"

export const requiredRules: Rule = {
	required: true,
	message: 'Это обязательное поле'
}

export const emailRules: Rule = {
	type: 'email',
	message: 'Почта введена некорректно'
}

export const maxLengthRule = (len: number): Rule => ({
	max: len,
	message: 'Превышена максимальная длина'
})