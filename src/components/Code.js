import React from 'react';
import { ReactComponent as Logo } from '../assets/github-icon.svg';

const Code = () => {
	return (
		<div className='Page'>
			<p>
				The code is available on{' '}
				<a href='#' target='blank' class='link'>
					Github
				</a>
				.
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
			<Logo className='Icon' />
		</div>
	);
};

export default Code;
