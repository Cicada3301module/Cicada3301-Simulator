let isPaused = false; // Track the pause state manually

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('overlayCanvas');
    const overlayImage = document.getElementById('overlayImage');
    const ctx = canvas.getContext('2d');
    const playButton = document.getElementById('playButton');

    let detections = []; // Store face detections

    // Load face-api.js models from CDN
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights')
    ]).then(() => {
        video.addEventListener('loadeddata', () => {
            // Set canvas size to match the video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.style.width = `${video.videoWidth}px`; // Ensure canvas matches video size
            canvas.style.height = `${video.videoHeight}px`;
        });
    });

    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playButton.style.display = 'none'; // Hide play button when video plays
            isPaused = false;
        }
    });

    video.addEventListener('play', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.style.width = `${video.videoWidth}px`; // Ensure canvas matches video size
        canvas.style.height = `${video.videoHeight}px`;
        playButton.style.display = 'none'; // Hide play button when video plays
        isPaused = false;
        detectFace();
    });

    video.addEventListener('pause', () => {
        drawOverlayImage();
        playButton.style.display = 'block'; // Show play button when video is paused
        isPaused = true;
    });

    video.addEventListener('click', () => {
        if (!isPaused) {
            video.pause();
        }
    });

    async function detectFace() {
        if (isPaused) return; // Skip detection if video is paused

        // Detect faces and landmarks
        detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw detections and overlay image
        detections.forEach(detection => {
            const { x, y, width, height } = detection.detection.box;

            // Draw face box
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.closePath();

            // Draw landmarks
            faceapi.draw.drawFaceLandmarks(canvas, [detection]);

            // Draw overlay image on top of face detection
            ctx.drawImage(
                overlayImage,
                x, y, width, height // Position and size of overlay image
            );
        });

        requestAnimationFrame(detectFace);
    }

    function drawOverlayImage() {
        // Clear canvas and redraw overlay image at the last detected face positions
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        detections.forEach(detection => {
            const { x, y, width, height } = detection.detection.box;

            // Draw overlay image on top of face detection
            ctx.drawImage(
                overlayImage,
                x, y, width, height // Position and size of overlay image
            );
        });
    }
});
