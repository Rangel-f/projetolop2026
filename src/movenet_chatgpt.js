import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

await tf.ready();

const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet
);

const video = document.querySelector("#meu_video");
const canvas = document.querySelector("#meu_canvas");
const ctx = canvas.getContext("2d");

// ==========================
// Inicializa a webcam
// ==========================
async function iniciarCamera() {

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    });

    video.srcObject = stream;

    await new Promise(resolve => {
        video.onloadeddata = resolve;
    });

    await video.play();

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    detectarPoses();
}

// ==========================
// Desenha um keypoint
// ==========================
function desenharPonto(x, y) {

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
}

// ==========================
// Desenha uma linha
// ==========================
function desenharLinha(p1, p2) {

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

// ==========================
// Desenha o esqueleto
// ==========================
function desenharEsqueleto(keypoints) {

    const LIMIAR = 0.3;

    const conexoes = [
        [5, 6],   // ombros
        [5, 7],   // braço esquerdo
        [7, 9],
        [6, 8],   // braço direito
        [8, 10],

        [5, 11],  // tronco esquerdo
        [6, 12],  // tronco direito

        [11, 12], // quadris

        [11, 13], // perna esquerda
        [13, 15],

        [12, 14], // perna direita
        [14, 16]
    ];

    for (const [a, b] of conexoes) {

        const kp1 = keypoints[a];
        const kp2 = keypoints[b];

        if (
            kp1.score > LIMIAR &&
            kp2.score > LIMIAR
        ) {
            desenharLinha(kp1, kp2);
        }
    }
}

// ==========================
// Loop principal
// ==========================
async function detectarPoses() {

    const poses = await detector.estimatePoses(video);

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    if (poses.length > 0) {

        const keypoints = poses[0].keypoints;

                const pulsoDireito = keypoints[10];
                const pulsoEsquerdo = keypoints[9];
                const ombroDireito = keypoints[6];
                const ombroEsquerdo = keypoints[5];

                if(pulsoDireito.score > 0.6 && pulsoEsquerdo.score > 0.6) 
                    {
                        console.log(pulsoDireito.y);
                        console.log(pulsoEsquerdo.y);
                        if(pulsoDireito.y < ombroDireito.y && pulsoEsquerdo.y < ombroEsquerdo.y) console.log("Baixa as mão!");
                    }
                


        // desenha pontos
        for (const kp of keypoints) {

            if (kp.score < 0.6)
                continue;

            desenharPonto(kp.x, kp.y);
        }

        // desenha esqueleto
        desenharEsqueleto(keypoints);
    }

    requestAnimationFrame(detectarPoses);
}

iniciarCamera();