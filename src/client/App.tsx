import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateWrapper from './components/PrivateWrapper';
import BookDetail from './views/BookDetail';
import Books from './views/Books';
import Home from './views/Home';
import Login from './views/Login';
import NewBook from './views/NewBook';
import Register from './views/Register';


const App = (props: AppProps) => {
	const [greeting, setGreeting] = useState<string>('');



	return (
		<BrowserRouter >

			<Navbar />
			<Routes>

				<Route path='/' element={<Home />}> Home </Route>
				<Route path='/register' element={<Register />}> Register </Route>
				<Route path='/login' element={<Login />}> Login </Route>
				<Route path='/books' element={<Books />}> Books </Route>
				<Route path='/books/new' element={<NewBook />}> Create Book </Route>

				<Route path='/books/:id' element={<BookDetail />}> BookDetail </Route>


				<Route path='/books' element={<PrivateWrapper />}>

					{/* update book */}

					{/* Create book */}

				</Route>







			</Routes>

		</BrowserRouter>
	);
};

interface AppProps { }



export default App;
