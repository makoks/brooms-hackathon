import React from 'react';
import {Spin, SpinProps} from 'antd';

export const Loader = (props: SpinProps) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'start',
				justifyContent: 'center',
				padding: 24,
				margin: '0 auto'
			}}
		>
			<Spin size="large" {...props}/>
		</div>
	);
};
