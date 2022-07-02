import React from 'react';
import { Layout } from 'antd';
import { ContentHeader } from '../components';

export const Comparison = () => {
	return (
		<Layout>
			<ContentHeader title='Comparison' paddingBottom={true} />
			<Layout.Content style={{ margin: '27px 34px' }}>
				Comparison
      </Layout.Content>
		</Layout>
	);
};
