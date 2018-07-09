window.webcamUtils = {

  init: async function init(videoElement, width = 224, height = 224) {
    const stream = await navigator.mediaDevices.getUserMedia({video: true})
    const canvas = this.canvas = document.createElement('canvas')
    videoElement.srcObject = stream
    this.imageCapture = new ImageCapture(stream.getVideoTracks()[0])
    canvas.setAttribute('width', `${width}`);
    canvas.setAttribute('height', `${height}`);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    this.width = width
    this.height = height
    this.ctx = canvas.getContext('2d')
    this.video = videoElement
    return this
  },

  capture: function capture() {
    this.ctx.drawImage(this.video, 0, 0, this.width, this.height)
    return this
  }

}

export default window.webcamUtils