import React from 'react';
import { Layout } from 'antd';
import { ContentHeader } from '../components';

export const Home = () => {
	return (
		<Layout>
			<ContentHeader title='Профиль' paddingBottom={true} />
			<Layout.Content style={{ margin: '27px 34px' }}>
        Home
      </Layout.Content>
		</Layout>
	);
};
