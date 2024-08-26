let overlayImage;

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
            resolve();
        };
        overlayImage.onerror = (error) => {
            console.error('Error loading overlay image:', error);
            reject(error);
        };
    });
}

function startDetection() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    video.addEventListener('playing', () => {
        console.log('Video is playing');
        try {
            // Set canvas size to match the video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            console.log('Canvas dimensions set:', canvas.width, canvas.height);

            faceapi.matchDimensions(canvas, video);

            setInterval(async () => {
                try {
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
                        ctx.drawImage(overlayImage, x - 100, y - 100, width + 100, height + 100);
                    });
                } catch (error) {
                    console.error('Error during face detection:', error);
                }
            }, 100);
        } catch (error) {
            console.error('Error setting up canvas:', error);
        }
    });

    video.addEventListener('canplay', () => {
        console.log('Video can play, ready for detection.');
        // Only start detection when the video can actually play
        startDetection();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Document loaded, starting initialization...');
    try {
        await loadModels();
        await loadOverlayImage();
        console.log('Models and overlay image are loaded.');

        const video = document.getElementById('video');
        video.pause();  // Ensure the video doesn't play automatically

        video.addEventListener('canplay', () => {
            console.log('Video is ready to start detection.');
            startDetection();
        });
    } catch (error) {
        console.error('Initialization error:', error);
    }
});
