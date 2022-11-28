import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components';
import './light-and-dark-theme.css';
import {
	Clusters, Comparison,
	Employee, History, Home
} from './pages';
import { Summary } from './pages/Summary';
import { CompareListProvider } from "./providers/CompareListProvider";


function App() {
	return (
		<BrowserRouter>
			<CompareListProvider>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' element={<Home />} />
						<Route path='clusters' element={<Clusters />} />
						<Route path='employee/:id' element={<Employee />} />
						<Route path='comparison' element={<Comparison />} />
						<Route path='history' element={<History />} />
						<Route path='summary' element={<Summary />} />
					</Route>
				</Routes>
			</CompareListProvider>
		</BrowserRouter>
	);
}

export default App;
