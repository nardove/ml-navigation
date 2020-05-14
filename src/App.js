import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Help from './components/Help';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MicController from './components/MicController';

function App() {
	return (
		<div className='App'>
			<Router>
				{/* <Navigation /> */}
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/about' component={About} />
					<Route path='/contact' component={Contact} />
					<Route path='/help' component={Help} />
				</Switch>
			</Router>
			<MicController />
		</div>
	);
}

export default App;
