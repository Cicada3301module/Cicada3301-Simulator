// youtub.js

let overlayImage;

async function loadModels() {
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights')
    ]);
}

function loadOverlayImage() {
    return new Promise((resolve, reject) => {
        overlayImage = new Image();
        overlayImage.src = 'img/google.png'; // Updated image path
        overlayImage.onload = () => resolve();
        overlayImage.onerror = reject;
    });
}

function startDetection() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const playButton = document.getElementById('playButton');

    video.addEventListener('playing', () => {
        try {
            // Set canvas size to match the video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            faceapi.matchDimensions(canvas, video);

            setInterval(async () => {
                try {
                    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
                    const resizedDetections = faceapi.resizeResults(detections, video);
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // Draw overlay image on detected faces
                    resizedDetections.forEach(detection => {
                        const { x, y, width, height } = detection.box;
                        ctx.drawImage(overlayImage, x - 100, y - 100, width + 100, height + 100);
                    });

                    // If detection is successful, show the play button
                    if (resizedDetections.length > 0) {
                        playButton.style.display = 'block';
                    }

                } catch (error) {
                    console.error('Error during face detection:', error);
                }
            }, 100);

        } catch (error) {
            console.error('Error setting up canvas:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadModels();
    await loadOverlayImage(); // Ensure image is loaded before starting detection
    const video = document.getElementById('video');
    const playButton = document.getElementById('playButton');
    
    // Start detection when the video is ready to play
    video.oncanplay = () => {
        startDetection();
    };

    // Play the video when the play button is clicked
    playButton.addEventListener('click', () => {
        video.play();
        playButton.style.display = 'none'; // Hide the button after playing
    });
});
