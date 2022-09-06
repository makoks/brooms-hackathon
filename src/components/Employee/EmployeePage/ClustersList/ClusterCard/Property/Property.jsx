import React from 'react'
import {Badge, Col, Row, Typography} from "antd";
import moment from "moment/moment";
import {getInputComponentByPropType, getPropValueByPropType} from "../../../../../../common/helpers";
import TimeAgo from "javascript-time-ago";
import ru from 'javascript-time-ago/locale/ru'
import {dateLocale} from "../../../../../../common/locale";


TimeAgo.addDefaultLocale(ru)
const timeAgo = new TimeAgo('ru-RU')

export const Property = ({ prop, onPropChange, clusterId, isEdit }) => {
    const InputComponent = getInputComponentByPropType(prop.type)
    const value = prop.value[getPropValueByPropType(prop.type)]

	return (
        <Row justify='space-between' align='middle' key={prop.id}>
            <Col>
                <Badge color='blue' text={prop.name}/>
            </Col>
            <Col>
                {isEdit
                    ? <InputComponent
                        size='small'
                        value={(prop.type === 'DATE' && value) ? moment(new Date(value)) : value}
                        onChange={value => onPropChange(clusterId, prop.id, value)}
                        style={{minWidth: 500}}
                        locale='ru_RU'
                        format={dateLocale}
                    />
                    : <Typography.Text type='secondary'>
                        {!value ? '—' : prop.type === 'DATE'
                            ? timeAgo.format(new Date(value))
                            : value
                        }
                    </Typography.Text>
                }
            </Col>
        </Row>
	)
}