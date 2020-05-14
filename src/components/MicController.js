/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
// import paper from 'paper';
import AudioAnalyser from 'react-audio-analyser';

const MicController = () => {
	const [isRecording, setIsRecording] = useState('');

	useEffect(() => {
		setIsRecording('recording');
	}, []);

	return (
		<AudioAnalyser
			// className='AudioAnalyser'
			timeslice={1000}
			status={isRecording}
			audioBitsPerSecond={128000}
			audioSrc={''}
			audioType={'audio/webm'}
			mimeType={'audio/webm'}
			strokeColor={'#ff0000'}
			backgroundColor={'#fff'}
			// width={'100'}
			// height={'600'}
		/>
	);
};

export default MicController;
