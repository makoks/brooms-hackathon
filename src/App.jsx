import React, {useState} from 'react';
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


function App() {
	const [compareList, setCompareList] = useState(JSON.parse(localStorage.getItem('compareList')) ?? [])

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
						       removePersonFromCompareList={removePersonFromCompareList}/>
					       }
					/>
					<Route path="reference" element={<HeroPropertiesReference/>}/>
					<Route path={`hero/:id`} element={<Employee/>}/>
					<Route path="comparison" element={<Comparison compare={[compareList, setCompareList]}/>}/>
					<Route path="history" element={<History/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
