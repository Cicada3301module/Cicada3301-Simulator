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
        overlayImage.src = 'img/google.png';
        overlayImage.onload = () => resolve();
        overlayImage.onerror = reject;
    });
}

async function detectAndOverlayFaces(video, canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    try {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
        console.log('Detections:', detections);  // Log detections to check if face detection works

        if (detections.length > 0) {
            const resizedDetections = faceapi.resizeResults(detections, video);

            resizedDetections.forEach(detection => {
                const { x, y, width, height } = detection.box;
                ctx.drawImage(overlayImage, x - 100, y - 100, width + 100, height + 100);
            });

            return true;  // Overlay applied successfully
        } else {
            console.warn('No faces detected.');
            return false;
        }
    } catch (error) {
        console.error('Error during face detection:', error);
        return false;
    }
}

function startDetection() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const playButton = document.getElementById('playButton');

    video.addEventListener('playing', async () => {
        try {
            // Set canvas size to match the video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            faceapi.matchDimensions(canvas, video);

            let overlayApplied = false;
            const maxRetries = 5;
            let attempts = 0;

            while (!overlayApplied && attempts < maxRetries) {
                overlayApplied = await detectAndOverlayFaces(video, canvas);
                if (!overlayApplied) {
                    console.log(`Attempt ${attempts + 1} failed. Retrying...`);
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                attempts++;
            }

            if (overlayApplied) {
                playButton.style.display = 'block';  // Show play button
            } else {
                console.error('Failed to apply overlay after multiple attempts.');
                alert('Overlay application failed. Please try reloading the page.');
            }

        } catch (error) {
            console.error('Error setting up canvas:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadModels();
    await loadOverlayImage();  // Ensure image is loaded before starting detection

    const video = document.getElementById('video');
    const playButton = document.getElementById('playButton');

    // Start detection when the video is ready to play
    video.oncanplay = () => {
        console.log('Video ready for face detection.');
        startDetection();
    };

    // Ensure video doesn't play automatically
    video.pause();

    // Play the video when the play button is clicked
    playButton.addEventListener('click', () => {
        video.play();
        playButton.style.display = 'none';  // Hide the button after playing
    });
});
