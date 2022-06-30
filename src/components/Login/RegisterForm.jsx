import React from 'react';
import { Form, Input, Button } from 'antd';

export const RegisterForm = ({ setActiveTab }) => (
  <Form
    // onFinish={onFinish}
  >
    <Form.Item
      name="fio"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите Ваши ФИО!',
        },
      ]}
    >
      <Input placeholder="ФИО" />
    </Form.Item>
    <Form.Item
      name="email-register"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите Ваш Email!',
        },
      ]}
    >
      <Input placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password-register"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите Ваш пароль!',
        },
      ]}
    >
      <Input type="password" placeholder="Пароль" />
    </Form.Item>
    <Form.Item
      name="confirm-password"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, подтвердите Ваш пароль!',
        },
      ]}
    >
      <Input type="password" placeholder="Подтвердите пароль" />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Зарегистрироваться
      </Button>

      <Button type="link" style={{ float: 'right' }} onClick={() => setActiveTab('auth')}>
        Уже есть аккаунт
      </Button>
    </Form.Item>
  </Form>
);
