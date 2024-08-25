// youtub.js

async function loadModels() {
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights')
    ]);
}

function startDetection() {
    const video = document.getElementById('video');
    console.log(video);
	video.addEventListener("playing", (event) => {
	console.log("video can play");
	});
    video.addEventListener('playing', () => {
        try {
            // Create a canvas manually
            const canvas = document.createElement('canvas');
			//console.log(canvas);
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            document.body.append(canvas);
            faceapi.matchDimensions(canvas, video);

            setInterval(async () => {
                try {
                    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
                    const resizedDetections = faceapi.resizeResults(detections, video);
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    faceapi.draw.drawDetections(canvas, resizedDetections);
                } catch (error) {
                    console.error('Error during face detection:', error);
                }
            }, 100);

        } catch (error) {
            console.error('Error creating canvas from video:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadModels();
    const video = document.getElementById('video');
	console.log("loaded models");
    // Ensure the video is ready to play before starting detection
    video.oncanplay = () => {
        startDetection();
    };
});
