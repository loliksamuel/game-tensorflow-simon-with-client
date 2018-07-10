const tf = window.tf

// const INITIAL_MODEL = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
const INITIAL_MODEL = '/lib/model-1.json'

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
    const nDef = await tf.loadModel(INITIAL_MODEL)
    // const oLayer = nDef.getLayer('conv_pw_13_relu')
    const oLayer = nDef.getLayer('output_softmask')
    this.network = tf.model({
      inputs: nDef.inputs,
      outputs: oLayer.output
    })
  }

  sample (image, label) {
    const example = this.network.predict(image, label)
    const y = tf.tidy(() => tf.oneHot(tf.tensor1d([label]).toInt(), this.numberOfLabels))
    if (!this.xs) {
      this.xs = tf.keep(example)
      this.ys = tf.keep(y)
    } else {
      const oldXs = this.xs
      const oldYs = this.ys
      this.xs = tf.keep(oldXs.concat(example, 0))
      this.ys = tf.keep(oldYs.concat(y, 0))
      oldXs.dispose()
      oldYs.dispose()
      y.dispose()
    }
  }

  train (done = () => {}) {
    const model = this.model = tf.sequential({
      layers: [
        tf.layers.flatten({
          inputShape: [7, 7, 256]
        }),
        tf.layers.dense({
          units: tsParams.units,
          activation: 'relu',
          kernelInitializer: 'varianceScaling',
          useBias: true
        }),
        tf.layers.dense({
          units: this.numberOfLabels,
          kernelInitializer: 'varianceScaling',
          activation: 'softmax',
          useBias: false,
          name: "output_softmask"
        })
      ]
    })

    const optimizer = tf.train.adam(tsParams.learningRate)
    model.compile({
      optimizer,
      loss: 'categoricalCrossentropy'
    })

    const batchSize = Math.floor(this.xs.shape[0] * tsParams.batchSize)
    if (isNaN(batchSize) || batchSize <= 0) {
      throw new Error('Batch size is 0 or NaN. Please choose a non-zero fraction.')
    }

    const m = model.fit(this.xs, this.ys, {
      batchSize,
      epochs: tsParams.epochs,
      callbacks: {
        onBatchEnd: async (batch, logs) => {
          await tf.nextFrame()
          done(logs.loss.toFixed(7))
        }
      }
    });
    m.then((res) => {
      model.save('downloads://model-1');
    });
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
