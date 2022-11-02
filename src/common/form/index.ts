import {FormRule} from "antd";

export const requiredRules: FormRule = {
	required: true,
	message: 'Это обязательное поле'
}

export const emailRules: FormRule = {
	type: 'email',
	message: 'Почта введена некорректно'
}

export const maxLengthRule = (len: number): FormRule => ({
	max: len,
	message: 'Превышена максимальная длина'
})