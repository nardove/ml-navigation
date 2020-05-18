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

/*
<div>Teachable Machine Audio Model</div>
<button type="button" onclick="init()">Start</button>
<div id="label-container"></div>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.4.0/dist/speech-commands.min.js"></script>

<script type="text/javascript">
    // more documentation available at
    // https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/34slHad4d/";

    async function createModel() {
        const checkpointURL = URL + "model.json"; // model topology
        const metadataURL = URL + "metadata.json"; // model metadata

        const recognizer = speechCommands.create(
            "BROWSER_FFT", // fourier transform type, not useful to change
            undefined, // speech commands vocabulary feature, not useful for your models
            checkpointURL,
            metadataURL);

        // check that model and metadata are loaded via HTTPS requests.
        await recognizer.ensureModelLoaded();

        return recognizer;
    }

    async function init() {
        const recognizer = await createModel();
        const classLabels = recognizer.wordLabels(); // get class labels
        const labelContainer = document.getElementById("label-container");
        for (let i = 0; i < classLabels.length; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }

        // listen() takes two arguments:
        // 1. A callback function that is invoked anytime a word is recognized.
        // 2. A configuration object with adjustable fields
        recognizer.listen(result => {
            const scores = result.scores; // probability of prediction for each class
            // render the probability scores per class
            for (let i = 0; i < classLabels.length; i++) {
                const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        }, {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
        });

        // Stop the recognition in 5 seconds.
        // setTimeout(() => recognizer.stopListening(), 5000);
    }
</script>
*/
