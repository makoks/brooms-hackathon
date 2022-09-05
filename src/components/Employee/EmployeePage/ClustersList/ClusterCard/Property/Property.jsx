import React from 'react'
import {Badge, Col, Row, Typography} from "antd";
import moment from "moment/moment";
import {getInputComponentByPropType, getPropValueByPropType} from "../../../../../../common/helpers";
import TimeAgo from "javascript-time-ago";
import ru from 'javascript-time-ago/locale/ru'


TimeAgo.addDefaultLocale(ru)
const timeAgo = new TimeAgo('ru-RU')

export const Property = ({ prop, onPropChange, clusterId, isEdit }) => {
    const InputComponent = getInputComponentByPropType(prop.typeofMp)
    const value = prop.propertyValueModels[getPropValueByPropType(prop.typeofMp)]
    const propValueId = prop.propertyValueModels.id

	return (
        <Row justify='space-between' align='middle' key={prop.id}>
            <Col>
                <Badge color='blue' text={prop.nameProp}/>
            </Col>
            <Col>
                {isEdit
                    ? <InputComponent
                        size='small'
                        value={(prop.typeofMp === 'DATE' && value) ? moment(new Date(value)) : value}
                        onChange={value => onPropChange(clusterId, prop.id, propValueId, value)}
                        style={{minWidth: 500}}
                        locale='ru_RU'
                        format='DD.MM.YYYY'
                    />
                    : <Typography.Text type='secondary'>
                        {!value ? '—' : prop.typeofMp === 'DATE'
                            ? timeAgo.format(new Date(value))
                            : value
                        }
                    </Typography.Text>
                }
            </Col>
        </Row>
	)
}