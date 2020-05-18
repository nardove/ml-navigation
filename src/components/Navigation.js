import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
	// console.log('[Navigation] active', props.active);
	return (
		<nav className='Navigation'>
			<ul>
				{Object.entries(props.items).map((link) => {
					return (
						<Link
							to={link[1].path}
							className={props.active === link[1].name ? 'active' : null}
							// onClick={() => props.updateNav(link[1].name)}
						>
							<li>{link[1].name}</li>
						</Link>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
