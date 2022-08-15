import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {
	Home,
	History,
	Comparison,
	Employee,
	HeroPropertiesReference,
} from './pages';
import {Layout} from './components';
import './light-and-dark-theme.css';
import './App.css';
import {referenceBooksAPI} from "./API";


function App() {
	const [compareList, setCompareList] = useState(JSON.parse(localStorage.getItem('compareList')) ?? [])
	const [roles, setRoles] = useState(undefined)
	const [departments, setDepartments] = useState(undefined)
	const [positions, setPositions] = useState(undefined)
	const [projects, setProjects] = useState(undefined)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		const {getPositions, getDepartments, getProjects, getRoles} = referenceBooksAPI

		const getReferenceBooks = async () => {
			const positions = await getPositions()
			const departments = await getDepartments()
			const projects = await getProjects()
			const roles = await getRoles()

			setPositions(positions.data._embedded.userPositions)
			setDepartments(departments.data._embedded.userDepartments)
			setProjects(projects.data._embedded.userProjects)
			setRoles(roles.data._embedded.userRoles)
		}

		getReferenceBooks()
			.finally(() => setLoading(false))
	}, [])

	const addPersonInCompareList = (id) => {
		const newList = [...compareList, id]
		setCompareList(newList)
		localStorage.setItem('compareList', JSON.stringify(newList))
	}

	const removePersonFromCompareList = (id) => {
		const newList = compareList.filter(itemId => itemId !== id)
		setCompareList(newList)
		localStorage.setItem('compareList', JSON.stringify(newList))
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout compare={[compareList, setCompareList]}/>}>
					<Route path="/"
					       element={<Home
						       compareList={compareList}
						       addPersonInCompareList={addPersonInCompareList}
						       removePersonFromCompareList={removePersonFromCompareList}
						       referenceBooks={{roles, positions, departments, projects}}
						       referenceBooksLoading={loading}
					       />}
					/>
					<Route path="reference" element={<HeroPropertiesReference/>}/>
					<Route path={`employee/:id`} element={<Employee
						referenceBooks={{roles, positions, departments, projects}}
						referenceBooksLoading={loading}/>}/>
					<Route path="comparison" element={<Comparison compare={[compareList, setCompareList]}/>}/>
					<Route path="history" element={<History/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
