document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('overlayCanvas');
    const overlayImage = document.getElementById('overlayImage');
    const ctx = canvas.getContext('2d');
    const playButton = document.getElementById('playButton');

    let detections = []; // Store face detections
    let faceDetected = false; // Flag to check if a face has been detected

    // Load face-api.js models from CDN
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights')
    ]).then(() => {
        console.log('Face-api.js models loaded');
        video.addEventListener('loadeddata', () => {
            // Set canvas size to match the video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.style.width = `${video.videoWidth}px`;
            canvas.style.height = `${video.videoHeight}px`;
            console.log('Canvas size set to match video:', canvas.width, canvas.height);

            detectFace(); // Start detection immediately after video and models are loaded
        });
    });

    // Play button event listener
    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play().then(() => {
                playButton.style.display = 'none'; // Hide play button when video plays
                console.log('Play button clicked - Video playing');
                if (!faceDetected) detectFace(); // Continue detection if no face detected yet
            }).catch(error => {
                console.error('Error playing video:', error);
            });
        }
    });

    // Toggle play/pause on video click with no overlap
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play().then(() => {
                console.log('Video clicked - Video playing');
                if (!faceDetected) detectFace(); // Continue detection if no face detected yet
            }).catch(error => {
                console.error('Error playing video:', error);
            });
        } else {
            video.pause();
            console.log('Video clicked - Video paused');
        }
    });

    video.addEventListener('play', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        playButton.style.display = 'none'; // Hide play button when video plays
        if (!faceDetected) detectFace(); // Continue detection if no face detected yet
    });

    video.addEventListener('pause', () => {
        drawOverlayImage(); // Redraw the overlay image when the video is paused
        playButton.style.display = 'block'; // Show play button when video is paused
    });

    video.addEventListener('ended', () => {
        console.log('Video ended - Redrawing overlay image');
        drawOverlayImage(); // Redraw overlay image when the video ends
    });

    async function detectFace() {
        if (video.paused || video.ended || faceDetected) return; // Skip detection if video is paused, ended, or a face is already detected

        console.log('Detecting face...');
        // Detect faces and landmarks
        detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        console.log('Detections:', detections);

        if (detections.length > 0) {
            faceDetected = true; // Set flag to true when a face is detected
            console.log('Face detected - stopping further detection');
            drawOverlayImage(); // Apply overlay image on detection
        } else {
            requestAnimationFrame(detectFace); // Continue detection if no face detected
        }
    }

    function drawOverlayImage() {
        // Clear canvas and redraw overlay image at the last detected face positions
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    }
});
