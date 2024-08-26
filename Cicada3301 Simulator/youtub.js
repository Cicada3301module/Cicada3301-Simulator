let overlayImage;

async function loadModels() {
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights')
    ]);
    console.log('Face API models loaded');
}

function loadOverlayImage() {
    return new Promise((resolve, reject) => {
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
        try {
            // Set canvas size to match the video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            console.log('Canvas dimensions set:', canvas.width, canvas.height);

            faceapi.matchDimensions(canvas, video);

            setInterval(async () => {
                try {
                    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
                    console.log('Detections:', detections);

                    if (detections.length === 0) {
                        console.warn('No faces detected');
                        return; // Skip drawing if no faces are detected
                    }

                    const resizedDetections = faceapi.resizeResults(detections, video);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Test drawing the image directly on the canvas (for debugging)
                    // ctx.drawImage(overlayImage, 0, 0, 100, 100);  // Draw at top-left corner

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
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadModels();
        await loadOverlayImage();
        console.log('Models and overlay image are loaded');

        const video = document.getElementById('video');

        video.oncanplay = () => {
            console.log('Video can play, starting detection');
            startDetection();
        };
    } catch (error) {
        console.error('Initialization error:', error);
    }
});
