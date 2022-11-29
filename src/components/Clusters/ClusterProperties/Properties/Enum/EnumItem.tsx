import React, { useEffect, useState } from 'react'
import { Button, Col, Input, InputNumber, Row, Space } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { EditingTextByDoubleClick } from "../../../../common/EditingTextByDoubleClick";


type EnumItemProps = {
	deleting: boolean;
	deleteItem: (id: string) => Promise<void>;
	id: string;
	name: string;
	point: number;
	changeItem: (id: string, name: string, point: number) => Promise<void>;
	withWeights: boolean;
}

export const EnumItem: React.FC<EnumItemProps> = ({ deleting, deleteItem, id, withWeights, ...props }) => {
	const [name, setName] = useState<string | undefined>(props.name);
	const [point, setPoint] = useState<number | null>(withWeights ? props.point : 1);
	const [isEdit, setIsEdit] = useState(false);
	const [loading, setLoading] = useState(false);

	const changeItem = async () => {
		setLoading(true)
		props.changeItem(id, String(name), Number(point))
			.finally(() => {
				setLoading(false)
				setIsEdit(false)
			})
	}

	useEffect(() => {
		setPoint(withWeights ? props.point : 1);
	}, [withWeights, props.point])

	return (
		<Row justify='space-between' align='middle' wrap={false}>
			<Col>
				<Space size='middle'>
					<Button
						icon={<DeleteOutlined />}
						shape="circle" type="default"
						danger size="small"
						disabled={deleting}
						onClick={() => deleteItem(id)}
					/>
					<EditingTextByDoubleClick
						isEdit={isEdit}
						setIsEdit={setIsEdit}
						value={name}
						onChange={setName}
						onBlur={changeItem}
						loading={loading}
					/>
				</Space>
			</Col>
			<Col>
				<Input.Group compact style={{ display: 'flex', justifyContent: 'center' }} >
					<InputNumber disabled={!withWeights} value={point} onChange={setPoint} />
					<Button
						type="primary"
						onClick={changeItem}
						loading={loading}
						icon={<CheckOutlined />}
						disabled={!withWeights}
					/>
				</Input.Group>

			</Col>
		</Row>
	)
}