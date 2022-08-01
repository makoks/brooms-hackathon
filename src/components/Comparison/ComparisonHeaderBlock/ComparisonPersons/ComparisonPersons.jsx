import React from 'react'
import {Space} from "antd";
import {getShortName} from "../../../../common/helpers";
import {CloseCircleTwoTone} from "@ant-design/icons";


const ComparisonPersons = ({persons}) => {
	return (
		<Space size='large'>
			{persons.map(person => (
				<Space direction='vertical' align='center' key={person.id}>
					<CloseCircleTwoTone twoToneColor='#FFA39E' style={{fontSize: 27}}/>
					<span>{getShortName(person)}</span>
				</Space>
			))}
		</Space>
	)
}

export default ComparisonPersons