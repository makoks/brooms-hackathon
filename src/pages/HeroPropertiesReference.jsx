import React from 'react';
import { Layout } from 'antd';
import { ContentHeader } from '../components';

export const HeroPropertiesReference = () => {
	return (
		<Layout>
			<ContentHeader title='Hero Properties Reference' paddingBottom={true} />
			<Layout.Content style={{ margin: '27px 34px' }}>
				Hero Properties Reference
      </Layout.Content>
		</Layout>
	);
};
