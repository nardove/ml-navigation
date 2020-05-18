/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import paper from 'paper';

const SoundWave = (props) => {
	let wavePath = undefined;
	const byteChunkSlice = parseInt(props.byteChunk / 2);

	useEffect(() => {
		console.log('[SoundWave] did mount');
		paper.install(window);
		paper.setup('paper-canvas');
		view.onFrame = draw;

		// Setup wave path
		const buffer = parseInt(props.fftSize / props.byteChunk);
		const xSteps = (window.innerWidth * 1.0) / buffer + 1;
		const y = window.innerHeight / 2;

		wavePath = new Path();
		wavePath.strokeColor = '#f562d6';
		for (let i = 0; i < buffer; i++) {
			const x = i * xSteps;
			wavePath.add(new Point(x, y));
		}
		wavePath.strokeWidth = 6;
		wavePath.selected = true;
		wavePath.smooth();
	}, []);

	const draw = () => {
		// console.log('draw loop');
		props.analyser.getByteTimeDomainData(props.dataArray);

		for (let i = 0; i < wavePath.segments.length; i++) {
			const v = props.dataArray[i * byteChunkSlice] / 128.0;
			const y = (v * window.innerHeight) / 2;
			wavePath.segments[i].point.y = y;
		}
	};

	useEffect(() => {
		return () => {
			console.log('[SoundWave] will unmount');
			view.onFrame = undefined;
		};
	}, []);

	return null;
};

export default SoundWave;
