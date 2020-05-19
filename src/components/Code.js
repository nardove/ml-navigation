import React from 'react';
import { ReactComponent as Logo } from '../assets/github-icon.svg';

const Code = () => {
	return (
		<div className='Page'>
			<p>
				If you are interested please check the code on{' '}
				<a href='https://github.com/nardove/ml-navigation' target='blank' class='link'>
					Github
				</a>
				.
			</p>
			<p>
				The <strong>SpeechRecognitionModel.js</strong> has the Teachable Machine Audio
				implementation.
			</p>
			<p>
				More information about Teachable Machine Audio Library is available{' '}
				<a
					href='https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/audio'
					target='blank'
					class='link'>
					here
				</a>
				.
			</p>
			<p>Collaboration and suggestions are welcome!</p>
			{/* <Logo className='Icon' /> */}
		</div>
	);
};

export default Code;
