import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {
	Home,
	History,
	Comparison,
	HeroPropertiesChanging,
	HeroPropertiesReference,
} from './pages';
import {Layout} from './components';
import './light-and-dark-theme.css';
import './App.css';


function App() {
	const [compareList, setCompareList] = useState(JSON.parse(localStorage.getItem('compareList')) ?? [])

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout compare={[compareList, setCompareList]}/>}>
					<Route path="/" element={<Home compare={[compareList, setCompareList]}/>}/>
					<Route path="reference" element={<HeroPropertiesReference/>}/>
					<Route path={`hero/:id`} element={<HeroPropertiesChanging/>}/>
					<Route path="comparison" element={<Comparison/>}/>
					<Route path="history" element={<History/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
