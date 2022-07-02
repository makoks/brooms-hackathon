import React, {useState} from 'react';
import {Layout as AntdLayout, Menu, Space, Typography, Switch, Badge} from 'antd';
import {Link, NavLink, Outlet} from 'react-router-dom';
import {ProfileOutlined, BulbOutlined, BulbFilled, UnorderedListOutlined} from '@ant-design/icons';
import {Logo} from '../../images';
import {useCurrentPage} from '../../hooks';

export const Layout = () => {
	const currentPage = useCurrentPage();
	const [compareLength] = useState(JSON.parse(localStorage.getItem('compareList'))?.length ?? 0)

	const handleThemeChange = (checked) => {
		if (checked) {
			document.body.classList.add('dark-theme');
			document.body.classList.remove('light-theme');
		} else {
			document.body.classList.add('light-theme');
			document.body.classList.remove('dark-theme');
		}
	};

	return (
		<AntdLayout style={{minHeight: '100vh'}}>
			<AntdLayout.Header style={{
				color: '#fff',
				display: 'flex',
				justifyContent: 'space-between',
				borderBottom: '1px solid #424242'
			}}>
				<Space size="middle">
					<img src={Logo} alt="logo" width={32} height={24}/>
					<Typography.Text strong style={{color: '#fff', fontSize: 18}}>
						Heroes App
					</Typography.Text>
				</Space>
				<Space size="large">
					<Switch
						checkedChildren={<BulbOutlined/>}
						unCheckedChildren={<BulbFilled/>}
						onChange={handleThemeChange}
					/>
					<Badge count={compareLength} size='small'>
						<NavLink to='/reference'>
							<UnorderedListOutlined style={{color: 'white', fontSize: 20}}/>
						</NavLink>
					</Badge>

				</Space>
			</AntdLayout.Header>
			<AntdLayout>
				<AntdLayout.Sider style={{boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)'}}>
					<Menu mode="inline" style={{height: '100%', borderRight: 0}} selectedKeys={[currentPage]} items={[
						{label: <Link to="/">Home</Link>, key: 'home', icon: <ProfileOutlined/>},
						{label: <Link to="reference">MP Reference</Link>, key: 'reference', icon: <ProfileOutlined/>},
						{
							label: 'Reports', key: 'reports', icon: <ProfileOutlined/>, children: [
								{
									label: <Link to="comparison">Comparison</Link>,
									key: 'comparison',
									icon: <ProfileOutlined/>
								},
								{label: <Link to="history">History</Link>, key: 'history', icon: <ProfileOutlined/>},
							]
						},
					]}/>
				</AntdLayout.Sider>
				<Outlet/>
			</AntdLayout>
		</AntdLayout>
	);
};
