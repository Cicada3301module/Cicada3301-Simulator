let overlayImage;

async function loadModels() {
    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
            faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
            faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights')
        ]);
        console.log('Models loaded successfully.');
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

function loadOverlayImage() {
    return new Promise((resolve, reject) => {
        overlayImage = new Image();
        overlayImage.src = 'img/google.png';
        overlayImage.onload = () => {
            console.log('Overlay image loaded successfully.');
            resolve();
        };
        overlayImage.onerror = (error) => {
            console.error('Error loading overlay image:', error);
            reject(error);
        };
    });
}

async function detectAndOverlayFaces(video, canvas) {
    try {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
        console.log('Detections:', detections);

        if (detections.length > 0) {
            const resizedDetections = faceapi.resizeResults(detections, video);
            resizedDetections.forEach(detection => {
                const { x, y, width, height } = detection.box;
                ctx.drawImage(overlayImage, x - 100, y - 100, width + 100, height + 100);
            });
            return true;
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
            console.error('Error during detection setup:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadModels();
        await loadOverlayImage();

        const video = document.getElementById('video');
        const playButton = document.getElementById('playButton');

        video.oncanplay = () => {
            console.log('Video ready for face detection.');
            startDetection();
        };

        video.pause();  // Ensure video doesn't play automatically

        playButton.addEventListener('click', () => {
            video.play();
            playButton.style.display = 'none';  // Hide the button after playing
        });

    } catch (error) {
        console.error('Error during initialization:', error);
    }
});
