import React from 'react'
import {Divider, Space, Statistic} from "antd";


const StaticInfo = ({race, heroClass, guild, registerDate}) => {
	return (
		<Space>
			<Statistic title='Дата регистрации' value={registerDate?.toLocaleDateString('ru-RU')}/>
			<Divider type='vertical'/>
			<Statistic title='Раса' value={race}/>
			<Divider type='vertical'/>
			<Statistic title='Профессия' value={heroClass}/>
			<Divider type='vertical'/>
			<Statistic title='Гильдия' value={guild}/>
		</Space>
	)
}

export default StaticInfo