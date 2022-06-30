import React from 'react';
import { Spin } from 'antd';


export const Loader = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'start',
				justifyContent: 'space-between',
				padding: 24,
				margin: '0 auto'
			}}
		>
			<Spin size="large"/>
		</div>
	);
};
