// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
console.log("gaga")

import CameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo'
import * as faceapi from 'face-api.js'

let videoElement = document.getElementById('videoId')
let imgElement = document.getElementById('imgId')
let toggleVideoBtn = document.getElementById('toggleVideo')
let takePictureBtn = document.getElementById('takePicture')

let cameraPhoto = new CameraPhoto(videoElement)
let toggleVideo = false
toggleVideoBtn.addEventListener('click', () => {
    if (toggleVideo)
        cameraPhoto.stopCamera()
    else
        cameraPhoto.startCamera("user", { width: 640, height: 480 })
    toggleVideo = !toggleVideo
})

takePictureBtn.addEventListener('click', () => {
    const config = {}
    let dataUri = cameraPhoto.getDataUri(config)
    imgElement.src = dataUri
})

faceapi.loadFaceLandmarkModel(faceapi.nets.faceLandmark68Net)
const result = await faceapi.detectSingleFace(imgElement).withFaceLandmarks().withFaceDescriptor()
console.log(result.descriptor)