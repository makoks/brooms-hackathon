import React, { useState, useEffect } from 'react';
import { Card, Space, Layout, message } from 'antd';
import { ClusterItem, Loader } from '../../components';
import { clustersAPI } from '../../API/API';
import './index.css';
import { CreatingClusterPopover } from "../../components/Clusters/CreatingClusterPopover/CreatingClusterPopover";
import { ClusterData } from "../../components/Clusters/types";
import { Id } from "../../API/types";
import { usePropertyTypes } from "../../hooks/usePropertyTypes";

const CLUSTERS: ClusterData[] = JSON.parse(JSON.stringify({
	"_embedded": {
		"cluster": [{
			"name": "Данные сотрудника",
			"id": 1,
			"definition": "Данные сотрудника",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/1"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/1{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/1/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Время оценки",
			"id": 2,
			"definition": "Время оценки",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/2"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/2{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/2/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "ОС Тимлида",
			"id": 3,
			"definition": "ОС Тимлида",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/3"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/3{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/3/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "ОС Техлида",
			"id": 4,
			"definition": "ОС Техлида",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/4"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/4{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/4/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "УО",
			"id": 5,
			"definition": "УО",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/5"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/5{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/5/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Git",
			"id": 6,
			"definition": "Git",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/6"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/6{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/6/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "УМК",
			"id": 7,
			"definition": "УМК",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/7"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/7{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/7/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Интерпретация низкой оценки",
			"id": 8,
			"definition": "Интерпретация низкой оценки",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/8"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/8{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/8/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Интерпретация средней оценки",
			"id": 9,
			"definition": "Интерпретация средней оценки",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/9"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/9{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/9/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Интерпретация выше среднего оценки",
			"id": 10,
			"definition": "Интерпретация выше среднего оценки",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/10"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/10{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/10/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Интерпретация высокой оценки",
			"id": 11,
			"definition": "Интерпретация высокой оценки",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/11"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/11{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/11/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Математика 1",
			"id": 12,
			"definition": "Математика 1",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/12"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/12{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/12/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Математика 2",
			"id": 13,
			"definition": "Математика 2",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/13"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/13{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/13/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Математика 3",
			"id": 14,
			"definition": "Математика 3",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/14"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/14{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/14/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Математика 4",
			"id": 15,
			"definition": "Математика 4",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/15"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/15{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/15/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Математика 5",
			"id": 16,
			"definition": "Математика 5",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/16"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/16{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/16/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Математика 6",
			"id": 17,
			"definition": "Математика 6",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/17"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/17{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/17/properties{?projection}",
					"templated": true
				}
			}
		}, {
			"name": "Математика 7",
			"id": 18,
			"definition": "Математика 7",
			"_links": {
				"self": {
					"href": "https://brooms.herokuapp.com/cluster/18"
				},
				"cluster": {
					"href": "https://brooms.herokuapp.com/cluster/18{?projection}",
					"templated": true
				},
				"properties": {
					"href": "https://brooms.herokuapp.com/cluster/18/properties{?projection}",
					"templated": true
				}
			}
		}]
	},
	"_links": {
		"self": {
			"href": "https://brooms.herokuapp.com/cluster"
		},
		"profile": {
			"href": "https://brooms.herokuapp.com/profile/cluster"
		}
	},
	"page": {
		"size": 20,
		"totalElements": 18,
		"totalPages": 1,
		"number": 0
	}
}))._embedded.cluster

export const Clusters = () => {
	const [clusters, setClusters] = useState<ClusterData[]>(CLUSTERS);
	const [loading, setLoading] = useState(false);
	const { types, loading: typesLoading } = usePropertyTypes();

	const createCluster = async (clusterData: ClusterData) => {
		await clustersAPI.createCluster(clusterData)
			.then((res) => setClusters([
				...clusters,
				{ ...clusterData, id: res.data.id }
			]))
			.catch(() => message.error('Не удалось создать кластер :('))
	}

	const deleteCluster = async (id: Id) => {
		clustersAPI.deleteCluster(id)
			.then(() => setClusters(c => c.filter(cluster => cluster.id !== id)))
			.catch(() => message.error('Не удалось удалить кластер :('))
	}

	useEffect(() => {
		setLoading(true)
		const getClusters = async () => {
			const res = await clustersAPI.getClusters()
			setClusters(res.data._embedded.cluster)
		}

		getClusters()
			.finally(() => setLoading(false))
			.catch(() => message.error('Не удалось получить список кластеров :('))
	}, []);

	return (
		<Layout>
			<Layout.Content style={{ margin: '27px 34px' }}>
				<Card
					style={{ width: '30%' }}
					bodyStyle={{ paddingRight: 0 }}
					className='clusters'
					title={<CreatingClusterPopover createCluster={createCluster} />}
				>
					{!(loading || typesLoading)
						? (
							<Space direction="vertical" style={{ width: '100%' }}>
								{clusters.map(cluster => (
									<ClusterItem
										key={cluster.id}
										cluster={cluster}
										deleteCluster={deleteCluster}
										propertyTypes={types}
									/>
								))}
							</Space>
						)
						: <div style={{ display: 'flex', justifyContent: 'center' }}><Loader /></div>
					}
				</Card>
			</Layout.Content>
		</Layout>
	);
};
