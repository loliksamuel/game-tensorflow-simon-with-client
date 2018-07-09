# tensor-fuze
tensorflow js bootstrap project for Tikal's Fuze event

## API
### Learning Model
_./lib/tf.js_

exports default `class LearningModel`

#### `constructor (numberOfLabels: Integer)`
A learning model must be initialized with number of "labels" to recognize, no less than two.

#### `[async] initialize ()`
loads the default initial model for image detection from the google cloud

#### `captureImageFromCanvas (canvas: HTMLCanvasElement)`
creates a machine-learning data from image drawn in an HTML canvas
returns ImageDataModel

#### `sample (image: ImageDataModel, label: Integer)`
adds an image data with corresponsing index of the "label" to match.
The more samples provided for each label, the merrier.

#### `train (onProcess: Function)`
starts background analysis of the samples and returns *loss* value for each step of the training.
Lower numbers means better analysis and diffing between labels and their samples.
the *onProcess* callback is invoked with *loss* value for every change. Eventually it stops.

#### `test (image: ImageDataModel)`
return probabilities of the image to match a label. The length of the probabilities equals the length of the "labels"
passed into the learning model class. Numbers vary from 0 to 1


### Webcam Utils
_./lib/webcam.js_

sets window.webcamutils object (and exports as default). Not applicable for node.js projects

#### `[async] init (videoElement: HTMLVideoElement, width = 224, height = 224)`
creates a media stream object, requests permission to use webcam from the user, therefore async.
creates an HTMLCanvasElement and canvas context

#### `capture ()`
captures webcam image and draws in the canvas

#### Properties:
- [HTMLCanvasElement] `canvas`
- [canvas' context] `ctx`
- [HTMLVideoElement] `video`
