import React from 'react';
import gsap from 'gsap';

const Home = () => {
	// const pageRef = React.useRef(null);

	// React.useEffect(() => {
	// gsap.fromTo(pageRef, 1, { opacitiy: 0 }, { opacity: 1 });
	// }, []);

	return (
		<div className='Page'>
			<p>
				Small experiment to test the use of machine learning to control the navigation on a
				web site by using voice commands.
			</p>
			<p>
				Four different words where choosen to do so, <strong>home, about, code</strong> and{' '}
				<strong>help</strong>.
			</p>
			<p>
				Try it your self say <strong>"about"</strong>.
			</p>
		</div>
	);
};

export default Home;
