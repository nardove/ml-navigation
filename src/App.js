import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Code from './components/Code';
import Help from './components/Help';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import MicController from './components/MicController';
import { ReactComponent as Logo } from './assets/logo.svg';

import './App.scss';

const MenuItems = [
	{ name: 'Home', component: Home, path: '/' },
	{ name: 'About', component: About, path: '/about' },
	{ name: 'Code', component: Code, path: '/code' },
	{ name: 'Help', component: Help, path: '/help' },
];

const App = () => {
	const [activePage, setActivePage] = useState(MenuItems[0].name);

	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const currentLocation = location.pathname.substr(1);
		const locationToActivate =
			currentLocation === ''
				? 'Home'
				: currentLocation.charAt(0).toUpperCase() + currentLocation.slice(1);
		setActivePage(locationToActivate);
	}, [location]);

	const updateNav = (pageName) => {
		const name = pageName;
		const nameFormated =
			pageName === 'Home' ? '' : name.charAt(0).toLowerCase() + name.slice(1);

		console.log('[App.updateNav]', nameFormated);
		history.push('/' + nameFormated);
		setActivePage(pageName);
	};

	return (
		<div className='App'>
			<div className='Logo'>
				<Logo />
				<strong>ML Navigation</strong>
			</div>
			<Navigation items={MenuItems} active={activePage} />
			<Switch>
				{Object.entries(MenuItems).map((item) => {
					return <Route path={item[1].path} exact render={item[1].component} />;
				})}
			</Switch>
			<MicController updateNav={updateNav} />
			<canvas id='paper-canvas' resize='true' />
		</div>
	);
};

export default App;
