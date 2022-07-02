import React from 'react';
import { Layout } from 'antd';
import { ContentHeader } from '../components';

export const HeroPropertiesChanging = () => {
	return (
		<Layout>
			<ContentHeader title='Hero Properties Changing' paddingBottom={true} />
			<Layout.Content style={{ margin: '27px 34px' }}>
				Hero Properties Changing
      </Layout.Content>
		</Layout>
	);
};
