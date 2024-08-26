document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('overlayCanvas');
    const overlayImage = document.getElementById('overlayImage');
    const ctx = canvas.getContext('2d');
    const playButton = document.getElementById('playButton');

    // Load face-api.js models from CDN
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights')
    ]).then(startVideo);

    function startVideo() {
        navigator.mediaDevices.getUserMedia(
            { video: {} }
        ).then(stream => {
            video.srcObject = stream;
            video.play();
        }).catch(err => console.error(err));
    }

    video.addEventListener('play', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        detectFace();
    });

    video.addEventListener('pause', () => {
        // Clear canvas and show overlay image when video is paused
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
    });

    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playButton.textContent = 'Pause Video';
        } else {
            video.pause();
            playButton.textContent = 'Play Video';
        }
    });

    async function detectFace() {
        // Detect faces and landmarks
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        
        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw detections
        detections.forEach(detection => {
            // Draw face box
            const { x, y, width, height } = detection.detection.box;
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.closePath();

            // Draw landmarks
            faceapi.draw.drawFaceLandmarks(canvas, [detection]);
        });

        requestAnimationFrame(detectFace);
    }
});
