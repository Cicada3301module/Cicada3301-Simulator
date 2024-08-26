let overlayImage;
let videoLoaded = false; // Flag to check if video is ready
let imageLoaded = false; // Flag to check if the image is loaded

async function loadModels() {
    console.log('Loading face API models...');
    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
            faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
            faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights')
        ]);
        console.log('Face API models loaded successfully.');
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

function loadOverlayImage() {
    return new Promise((resolve, reject) => {
        console.log('Loading overlay image...');
        overlayImage = new Image();
        overlayImage.src = 'img/google.png'; // Ensure the path is correct

        overlayImage.onload = () => {
            console.log('Overlay image loaded successfully:', overlayImage);
            imageLoaded = true; // Set flag to true when the image is loaded
            resolve();
        };
        overlayImage.onerror = (error) => {
            console.error('Error loading overlay image:', error);
            reject(error);
        };
    });
}

function setupCanvas(video) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceapi.matchDimensions(canvas, video);
    console.log('Canvas setup complete with dimensions:', canvas.width, canvas.height);
}

function drawOverlayOnCanvas() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    setInterval(async () => {
        try {
            if (!videoLoaded) return; // Only proceed if video is loaded and ready

            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
            console.log('Face detections:', detections);

            if (detections.length === 0) {
                console.warn('No faces detected');
                return; // Skip drawing if no faces are detected
            }

            const resizedDetections = faceapi.resizeResults(detections, video);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw overlay image on detected faces
            resizedDetections.forEach(detection => {
                const { x, y, width, height } = detection.box;
                console.log('Drawing image at:', x, y, 'with size:', width, height);
                ctx.drawImage(overlayImage, x, y, width, height);
            });
        } catch (error) {
            console.error('Error during face detection:', error);
        }
    }, 100);
}

function startDetection() {
    const video = document.getElementById('video');

    video.addEventListener('loadeddata', () => {
        console.log('Video loaded');
        videoLoaded = true; // Set flag to indicate video is loaded
        setupCanvas(video); // Setup canvas when video is loaded

        if (imageLoaded) {
            drawOverlayOnCanvas(); // Start overlay drawing only if image is loaded
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Document loaded, starting initialization...');
    try {
        await loadModels();
        await loadOverlayImage();
        console.log('Models and overlay image are loaded.');

        const video = document.getElementById('video');
        video.pause(); // Ensure the video doesn't play automatically

        // Add a play button
        const playButton = document.createElement('button');
        playButton.textContent = 'Play Video';
        playButton.style.display = imageLoaded ? 'block' : 'none'; // Show button only if image is loaded
        playButton.addEventListener('click', () => {
            console.log('Playing video');
            video.play();
        });
        document.body.append(playButton);

        video.addEventListener('canplay', () => {
            console.log('Video can play');
            startDetection();
        });
    } catch (error) {
        console.error('Initialization error:', error);
    }
});
