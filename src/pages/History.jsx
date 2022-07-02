import React from 'react';
import { Layout } from 'antd';
import { ContentHeader } from '../components';

export const History = () => {
	return (
		<Layout>
			<ContentHeader title='History' paddingBottom={true} />
			<Layout.Content style={{ margin: '27px 34px' }}>
				History
      </Layout.Content>
		</Layout>
	);
};
