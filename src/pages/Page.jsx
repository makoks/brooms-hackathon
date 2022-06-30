import React from 'react';
import { Layout } from 'antd';
import { ContentHeader } from '../components';

export const Page = () => {
	return (
		<Layout>
			<ContentHeader title='Профиль' paddingBottom={true} />
			<Layout.Content style={{ margin: '27px 34px' }}>
        Page
      </Layout.Content>
		</Layout>
	);
};
