// youtub.js

let overlayImage;
let overlayApplied = false;

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

async function detectFaces(video, canvas) {
    const ctx = canvas.getContext('2d');

    // Attempt detection multiple times before giving up
    for (let attempt = 0; attempt < 5; attempt++) {
        try {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
            if (detections.length > 0) {
                const resizedDetections = faceapi.resizeResults(detections, video);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw overlay image on detected faces
                resizedDetections.forEach(detection => {
                    const { x, y, width, height } = detection.box;
                    ctx.drawImage(overlayImage, x - 100, y - 100, width + 100, height + 100);
                });

                overlayApplied = true;
                return true; // Successfully applied overlay
            }
        } catch (error) {
            console.error(`Error during face detection (attempt ${attempt + 1}):`, error);
        }
        // If detection fails, wait before trying again
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    return false; // Overlay not applied after retries
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

            const success = await detectFaces(video, canvas);

            if (success) {
                playButton.style.display = 'block'; // Show play button if overlay is applied
            } else {
                console.error('Overlay application failed.');
                alert('Failed to apply the image overlay. Please try reloading the page.');
            }

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

    // Ensure video doesn't play automatically
    video.pause();

    // Play the video when the play button is clicked
    playButton.addEventListener('click', () => {
        if (overlayApplied) {
            video.play();
            playButton.style.display = 'none'; // Hide the button after playing
        } else {
            alert('Overlay not applied correctly. Please wait.');
        }
    });
});
