import React from 'react';

const About = () => {
	return (
		<div className='Page'>
			<p>
				Hopefully you got here by using the <strong>"about"</strong> voice command.
			</p>
			<p>
				The implementation is still very rough, I noticed that if there is too much noise a
				random command may trigger, it works best when there is little to none background
				noise.
			</p>
			<p>
				Google{' '}
				<a href='https://teachablemachine.withgoogle.com/' target='blank' class='link'>
					Teachable Machine
				</a>{' '}
				was used to train the model, and{' '}
				<a href='https://reactjs.org/' target='blank' class='link'>
					React
				</a>{' '}
				to build the app.
			</p>
			<p>
				Want to see the code? say <strong>"code"</strong>.
			</p>
		</div>
	);
};

export default About;
