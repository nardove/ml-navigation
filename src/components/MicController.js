/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useState, useEffect, Fragment } from 'react';
import paper from 'paper';
import SpeechRecognitionModel from './SpeechRecognitionModel';

import { ReactComponent as MicOnSvg } from '../assets/mic-on.svg';
import { ReactComponent as MicOffSvg } from '../assets/mic-off.svg';
import variables from '../App.scss';

const MicController = (props) => {
	let audioContext, analyser, dataArray, source, wavePath, wavePath2;
	audioContext = analyser = dataArray = source = wavePath = wavePath2 = null;

	const byteChunk = 32;
	const byteChunkSlice = parseInt(byteChunk / 2);
	const byteChunkSliceHalf = parseInt(byteChunk / 4);
	const fftSize = 512;

	const [audio, setAudio] = useState(null);
	const [isMuted, setIsMuted] = useState(false);

	useEffect(() => {
		console.log('[MicController] did update');
		init();
	}, [audio]);

	useEffect(() => {
		console.log('[MicController] did mount');
		getMicrophone();
		paper.install(window);
		paper.setup('paper-canvas');
	}, []);

	// useEffect(() => {
	// 	return () => {
	// 		console.log('[MicController] will unmount');
	// 		view.onFrame = null;
	// 		analyser.disconnect();
	// 		source.disconnect();
	// 	};
	// }, []);

	const getMicrophone = async () => {
		try {
			console.log('[MicController] getMicrophone');
			const audio = await navigator.mediaDevices
				.getUserMedia({
					audio: true,
					video: false,
				})
				.then(console.log('mic ready'));
			setAudio(audio);
		} catch (err) {
			alert(
				'Microphone support for mobile devices is not not supported at the moment, but it will soon...'
			);
		}
	};

	const init = () => {
		audioContext = analyser = dataArray = source = null;
		if (audio) {
			// Mic audio setup/initialisation
			audioContext = new (window.AudioContext || window.webkitAudioContext)();

			analyser = audioContext.createAnalyser();
			analyser.fftSize = fftSize;

			dataArray = new Uint8Array(analyser.frequencyBinCount);

			source = audioContext.createMediaStreamSource(audio);
			source.connect(analyser);

			view.onFrame = draw;

			paper.project.activeLayer.removeChildren();
			createWavePaths();
			/*
			console.log(
				`xSteps: ${xSteps} - Steps * W: ${xSteps * buffer} - width: ${window.innerWidth}`
			);
			console.log(
				`Path Segments: ${wavePath.segments.length} - Buffer: ${buffer} - Data Size: ${dataArray.length}`
			);
			*/
			console.log('[MicController] audio: ', audio);
		}
	};

	const createWavePaths = () => {
		const buffer = parseInt(fftSize / byteChunk);
		const xSteps = (window.innerWidth * 1.0) / (buffer - 1);
		const y = window.innerHeight / 2;
		const thickness = 50;

		wavePath = wavePath2 = null;

		wavePath = new Path();
		wavePath.strokeColor = variables.pink;
		wavePath.strokeWidth = thickness;
		// wavePath.opacity = 0.6;

		wavePath2 = new Path();
		wavePath2.strokeColor = variables.turquoise;
		wavePath2.strokeWidth = thickness;
		// wavePath2.opacity = 0.6;
		wavePath2.blendMode = 'multiply';

		for (let i = 0; i < buffer; i++) {
			const point = new Point(i * xSteps, y);
			wavePath.add(point);
			wavePath2.add(point);
		}

		wavePath.smooth();
		wavePath2.smooth();
	};

	const toggleMicrophone = () => {
		const prevMuteState = isMuted;
		setIsMuted(!prevMuteState);
		audio.getAudioTracks()[0].enabled = isMuted;
	};

	const draw = () => {
		// console.log('draw loop');
		analyser.getByteTimeDomainData(dataArray);

		wavePath.segments.forEach((segment, i) => {
			const v = dataArray[i * byteChunkSlice] / 128.0;
			const y = (v * window.innerHeight * 1.5) / 2;
			segment.point.y = y;
		});

		wavePath2.segments.forEach((segment, i) => {
			const v = dataArray[i * byteChunkSliceHalf] / 128.0;
			const y = (v * window.innerHeight * 1.5) / 2 + 35;
			segment.point.y = y;
		});
	};

	return (
		<Fragment>
			{console.log('[MicController] did render')}
			<div className='MicButton'>
				<button onClick={toggleMicrophone}>{isMuted ? <MicOnSvg /> : <MicOffSvg />}</button>
			</div>
			<canvas id='paper-canvas' resize='true' />
			<SpeechRecognitionModel isMuted={isMuted} updateNav={props.updateNav} />
		</Fragment>
	);
};

export default MicController;
