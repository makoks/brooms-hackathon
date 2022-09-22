import React, {useEffect, useState} from 'react'
import {propertiesAPI} from "../../../../../API/API";
import {Space} from "antd";
import {Loader} from "../../../../common/Loader";
import {AddButton} from "../../../../common/AddButton";
import {EnumItem} from "./EnumItem";


export const EnumList = ({id}) => {
	const [loading, setLoading] = useState(false)
	const [enumList, setEnumList] = useState([])
	const [deletingItemsIds, setDeletingItemsIds] = useState([])

	const deleteEnumItem = async (id) => {
		setDeletingItemsIds(ids => [...ids, id])
		propertiesAPI.deleteEnumItem(id)
			.then(() => {
				setDeletingItemsIds(ids => ids.filter(itemId => itemId !== id))
				setEnumList(items => items.filter(item => item.id !== id))
			})
	}

	const changeEnumItem = async (id, name) => {
		await propertiesAPI.changeEnumItem(id, name)
			.then(() => {
				setEnumList(items => items.map(item => {
					if (item.id === id) {
						return {...item, name}
					}
					return item
				}))
			})
	}

	useEffect(() => {
		const getEnumList = async () => {
			setEnumList(await propertiesAPI.getEnumList(id))
		}

		setLoading(true)
		getEnumList()
			.finally(() => setLoading(false))
	}, [id])

	return (
		<Space direction="vertical" size='middle' style={{width: 'calc((100vw - 300px) / 3)', padding: '0'}}>
			{loading
				? <div style={{display: 'flex', justifyContent: 'center'}}><Loader/></div>
				: <>
					<AddButton/>
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