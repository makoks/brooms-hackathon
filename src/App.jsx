import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {
	Home,
	History,
	Comparison,
	Employee,
	Clusters,
} from './pages';
import {Layout} from './components';
import './light-and-dark-theme.css';
import './App.css';
import {CompareListProvider} from "./providers/CompareListProvider";


function App() {
	return (
		<BrowserRouter>
			<CompareListProvider>
				<Routes>
					<Route element={<Layout/>}>
						<Route path="/" element={<Home/>}/>
						<Route path="clusters" element={<Clusters/>}/>
						<Route path={`employee/:id`} element={<Employee/>}/>
						<Route path="comparison" element={<Comparison/>}/>
						<Route path="history" element={<History/>}/>
					</Route>
				</Routes>
			</CompareListProvider>
		</BrowserRouter>
	);
}

export default App;
