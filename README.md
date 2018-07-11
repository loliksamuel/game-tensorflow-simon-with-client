# Tensor PYGO

API:

webcamutils
- async init(HTMLVideoElement, width = 224, height = 224) // try changing the size and nothing works :( dunno why
- capture()
- public property canvas (snapshots are drawn in it)

tensor flow exports class LearningModel
- constructor (Int - number of labels)
- async initialize
- sample (image, label)
- train (done callback)
- async test (image) -> returns probabilities
- captureImageFromCanvas (HTMLCanvasElement) return image to use with sample or test methods

USAGE:

Run `npm` once to install dependencies

Run `npm start`

Enjoy.
