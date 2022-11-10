import React, {useEffect, useState} from 'react'
import {propertiesAPI} from "../../../../../API/API";
import {Space, Input, Button, message} from "antd";
import {Loader} from "../../../../common/Loader";
import {AddButton} from "../../../../common/AddButton";
import {EnumItem} from "./EnumItem";
import {CheckOutlined} from "@ant-design/icons";
import {Enum} from "../../../types";
import {Id} from "../../../../../API/types";


type EnumListProps = {
	propertyId: Id;
};

export const EnumList: React.FC<EnumListProps> = ({propertyId}) => {
	const [loading, setLoading] = useState(false)
	const [enumList, setEnumList] = useState<Enum[]>([])
	const [deletingItemsIds, setDeletingItemsIds] = useState<string[]>([])
	const [isEdit, setIsEdit] = useState(false)
	const [creating, setCreating] = useState(false)
	const [newEnumItem, setNewEnumItem] = useState('')

	const createEnumItem = async () => {
		setCreating(true)
		propertiesAPI.createEnumItem(newEnumItem, propertyId)
			.then(({data: {id}}) => {
				setEnumList(list => [...list, {name: newEnumItem, id}])
				setCreating(false)
				setIsEdit(false)
				setNewEnumItem('')
			})
			.catch(() => message.error('Не удалось добавить элемент в список :('))
	}

	const deleteEnumItem = async (id: string) => {
		setDeletingItemsIds(ids => [...ids, id])
		propertiesAPI.deleteEnumItem(id)
			.then(() => {
				setDeletingItemsIds(ids => ids.filter(itemId => itemId !== id))
				setEnumList(items => items.filter(item => item.id !== id))
			})
			.catch(() => message.error('Не удалось удалить элемент из списка :('))
	}

	const changeEnumItem = async (id: string, name: string) => {
		await propertiesAPI.changeEnumItem(id, name)
			.then(() => {
				setEnumList(items => items.map(item => {
					if (item.id === id) {
						return {...item, name}
					}
					return item
				}))
			})
			.catch(() => message.error('Не удалось изменить элемент списка :('))
	}

	useEffect(() => {
		const getEnumList = async () => {
			setEnumList(await propertiesAPI.getEnumList(propertyId))
		}

		setLoading(true)
		getEnumList()
			.finally(() => setLoading(false))
			.catch(() => message.error('Не удалось получить список :('))
	}, [propertyId])

	return (
		<Space direction="vertical" size='middle' style={{width: 'calc((100vw - 300px) / 3)', padding: '0'}}>
			{loading
				? <div style={{display: 'flex', justifyContent: 'center'}}><Loader/></div>
				: <>
					{isEdit
						? <Input.Group compact style={{padding: '16px 12px 0', display: 'flex', justifyContent: 'center'}}>
							<Input
								value={newEnumItem}
								onChange={e => setNewEnumItem(e.target.value)}
								style={{width: '80%'}}
							/>
							<Button
								type="primary"
								onClick={createEnumItem}
								loading={creating}
							>
								<CheckOutlined/>
							</Button>
						</Input.Group>
						: <AddButton onClick={() => setIsEdit(true)}/>
					}
					<Space style={{width: '100%', padding: '0 12px 16px 12px'}} direction='vertical' size='middle'>
						{enumList.map(e => (
							<EnumItem
								key={e.id}
								id={e.id}
								name={e.name}
								deleteItem={() => deleteEnumItem(e.id)}
								deleting={deletingItemsIds.includes(e.id)}
								changeItem={changeEnumItem}
							/>
						))}
					</Space>
				</>
			}
		</Space>
	)
}