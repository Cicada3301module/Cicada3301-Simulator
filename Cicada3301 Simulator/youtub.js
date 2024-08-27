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
            canvas.style.width = `${video.videoWidth}px`;
            canvas.style.height = `${video.videoHeight}px`;
            console.log('Canvas size set to match video:', canvas.width, canvas.height);

            // Start detecting faces once the video and models are loaded
            detectFace();
        });
    });

    // Play button event listener
    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play().then(() => {
                playButton.style.display = 'none'; // Hide play button when video plays
                console.log('Play button clicked - Video playing');
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
            }).catch(error => {
                console.error('Error playing video:', error);
            });
        } else {
            video.pause();
            console.log('Video clicked - Video paused');
        }
    });

    video.addEventListener('play', () => {
        playButton.style.display = 'none'; // Hide play button when video plays
    });

    video.addEventListener('pause', () => {
        drawOverlayImage();
        playButton.style.display = 'block'; // Show play button when video is paused
    });

    async function detectFace() {
        if (video.paused) return; // Skip detection if video is paused

        // Detect faces and landmarks
        detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

        if (detections.length > 0) {
            // Clear canvas before drawing
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw detections and overlay image
            detections.forEach(detection => {
                const { x, y, width, height } = detection.detection.box;

                console.log('Overlay coordinates:', x, y, width, height);

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

        // Continue detecting faces even when video is paused until a face is detected
        requestAnimationFrame(detectFace);
    }

    function drawOverlayImage() {
        // Clear canvas and redraw overlay image at the last detected face positions
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        detections.forEach(detection => {
            const { x, y, width, height } = detection.detection.box;

            console.log('Overlay coordinates:', x, y, width, height);

            // Draw overlay image on top of face detection
            ctx.drawImage(
                overlayImage,
                x, y, width, height // Position and size of overlay image
            );
        });
    }
});
