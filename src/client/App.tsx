import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';


const App = (props: AppProps) => {
	const [greeting, setGreeting] = useState<string>('');



	return (
		<BrowserRouter >

			<Navbar />
			<Routes>


				<h1 className="text-primary text-center">Hello </h1>


			</Routes>

		</BrowserRouter>
	);
};

interface AppProps { }



export default App;
