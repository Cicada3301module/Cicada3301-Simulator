const video = document.getElementById('video');
const canvas = document.getElementById('overlayCanvas');
const overlayImage = document.getElementById('overlayImage');
const ctx = canvas.getContext('2d');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

video.addEventListener('play', () => {
    canvas.width = video.width;
    canvas.height = video.height;
    detectFace();
});

video.addEventListener('pause', () => {
    // Clear canvas and show overlay image when video is paused
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
});

async function detectFace() {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
    if (detections.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawFaceLandmarks(canvas, detections);
    }
    requestAnimationFrame(detectFace);
}
