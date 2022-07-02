import React from 'react'
import {Avatar, Space, Typography} from "antd";
import StaticInfo from "../StaticInfo";


const HeroMainInfo = ({avatar, nickname, about, race, guild, heroClass, registerDate}) => {
	return (
        <div style={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'space-between'
        }}>
            <Space>
                <Avatar src={avatar} size={72} />
                <Space direction='vertical'>
                    <Typography.Title level={4}>{nickname}</Typography.Title>
                    <Typography.Paragraph>{about}</Typography.Paragraph>
                </Space>
            </Space>
            <StaticInfo
                race={race}
                guild={guild}
                heroClass={heroClass}
                registerDate={registerDate}
            />
        </div>
	)
}

export default HeroMainInfo