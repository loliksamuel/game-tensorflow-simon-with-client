const tf = window.tf

const MOBILE_NETWORK_MODEL = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
const TRAINED_MODEL = '/lib/model-1.json'

const tsParams = {
  units: 100,
  epochs: 20,
  batchSize: 0.4,
  learningRate: 0.0001,
  threshold: 0.95
}

class LearningModel {

  constructor (numberOfLabels = 2) {
    if (numberOfLabels < 2) {
      throw new Error('Minimum of 2 labels are required to create a learning model')
    }
    this.numberOfLabels = numberOfLabels
    this.xs = null
    this.ys = null
  }

  async initialize () {
    const mobileNetDef = await tf.loadModel(MOBILE_NETWORK_MODEL)
    const mobileNetLayer = mobileNetDef.getLayer('conv_pw_13_relu')

    const trainedDef = await tf.loadModel(TRAINED_MODEL)
    const trainedLayer = trainedDef.getLayer('output_softmask')

    this.network = tf.model({
      inputs: mobileNetDef.inputs,
      outputs: mobileNetLayer.output
    })

    this.model = tf.model({
      inputs: trainedDef.inputs,
      outputs: trainedLayer.output
    })
  }

  async test (image) {
    const predictedClass = tf.tidy(() => {
      const activation = this.network.predict(image);
      const predictions = this.model.predict(activation);
      return predictions.as1D();
    });

    const probability = await predictedClass.data()
    predictedClass.dispose()
    await tf.nextFrame()
    return probability
  }

  captureImageFromCanvas (canvas) {
    const fromPixels = tf.fromPixels(canvas)
    const size = Math.min(fromPixels.shape[0], fromPixels.shape[1]);
    const centerHeight = fromPixels.shape[0] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = fromPixels.shape[1] / 2;
    const beginWidth = centerWidth - (size / 2);
    const cropped = fromPixels.slice([beginHeight, beginWidth, 0], [size, size, 3]);
    const batched = cropped.expandDims(0)
    const image = batched.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    return image
  }

}

export default LearningModel
