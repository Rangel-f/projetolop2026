import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

await tf.ready();

const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet
);

const video_element = document.querySelector("#meu_video");
const canvas = document.getElementById("meu_canvas");
const ctx = canvas.getContext("2d");

async function startVideoFromCamera() {

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    });

    video_element.srcObject = stream;

    await new Promise(resolve => {
        video_element.onloadeddata = resolve;
    });

    await video_element.play();

    canvas.width = video_element.videoWidth;
    canvas.height = video_element.videoHeight;

    const poses = await detector.estimatePoses(video_element);

    //console.log(poses);
    detectar();

}

startVideoFromCamera();

const button_startCamera = document.getElementById('iniciar_camera');

button_startCamera.addEventListener('click', async =>{

    startVideoFromCamera();
})






function desenharKeypoints(keypoints, ctx) {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const ponto of keypoints) {

        // Ignora pontos com baixa confiança
        if (ponto.score < 0.6) continue;
        console.log(ponto.score);

        ctx.beginPath();
        ctx.arc(ponto.x, ponto.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

async function detectar() {

    const poses = await detector.estimatePoses(video_element);

    if (poses.length > 0) {
        desenharKeypoints(poses[0].keypoints, ctx);
    }

    requestAnimationFrame(detectar);
}