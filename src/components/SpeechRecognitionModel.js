import React, { useEffect, useState } from 'react';
import * as speechCommands from '@tensorflow-models/speech-commands';
// import tf from '@tensorflow/tfjs';

const SpeechRecognitionModel = (props) => {
	const URL = 'https://teachablemachine.withgoogle.com/models/34slHad4d/';

	const [recognizerModel, setReconizerModel] = useState(null);

	useEffect(() => {
		console.log('[SpeechRecognitionModel] did mount');
		init();
	}, []);

	useEffect(() => {
		console.log('[SpeechRecognitionModel] did update', props.isMuted);
		if (recognizerModel) {
			console.log('model muted');
			props.isMuted ? recognizerModel.stopListening() : startListening(recognizerModel);
		}
	}, [props.isMuted]);

	useEffect(() => {
		console.log('recognizerModel state set', props.isMuted);
	}, [recognizerModel]);

	async function createModel() {
		const checkpointURL = URL + 'model.json';
		const metadataURL = URL + 'metadata.json';

		const recognizer = speechCommands.create(
			'BROWSER_FFT',
			undefined,
			checkpointURL,
			metadataURL
		);

		await recognizer.ensureModelLoaded().then(console.log('Model loaded'));

		return recognizer;
	}

	async function init() {
		const recognizer = await createModel();
		startListening(recognizer);
		setReconizerModel(recognizer);
	}

	const startListening = (recognizer) => {
		const classLabels = recognizer.wordLabels();
		recognizer.listen(
			(result) => {
				const scores = result.scores;

				classLabels.forEach((label, i) => {
					// const classPrediction = label + ': ' + result.scores[i].toFixed(2);
					// console.log('Prediction ', classPrediction);
					if (result.scores[i].toFixed(2) > 0.75 && label !== '_background_noise_') {
						console.log('Prediction ', label);
						props.updateNav(label);
					}
				});
			},
			{
				includeSpectrogram: true,
				probabilityThreshold: 0.75,
				invokeCallbackOnNoiseAndUnknown: true,
				overlapFactor: 0.5,
			}
		);
	};

	return null;
};

export default SpeechRecognitionModel;
