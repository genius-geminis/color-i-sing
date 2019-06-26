// @ts-nocheck
let heading = document.querySelector('h1');
heading.textContent = 'CLICK ANYWHERE TO START';
document.body.onclick = init;

// eslint-disable-next-line max-statements
function init() {
  heading.textContent = 'Color-I-Sing';

  // Older browsers might not implement mediaDevices at all, so we set an empty object first
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }

  // Some browsers partially implement mediaDevices. We can't just assign an object
  // with getUserMedia as it would overwrite existing properties.
  // Here, we will just add the getUserMedia property if it's missing.
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      // First get ahold of the legacy getUserMedia, if present
      let getUserMedia =
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return Promise.reject(
          new Error('getUserMedia is not implemented in this browser')
        );
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise(function(resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
  // window. is needed otherwise Safari explodes

  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let source;
  let stream;

  //set up the different audio nodes we will use for the app

  let analyser = audioCtx.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  let distortion = audioCtx.createWaveShaper();
  let gainNode = audioCtx.createGain();
  let biquadFilter = audioCtx.createBiquadFilter();
  let convolver = audioCtx.createConvolver();

  const colors = {
    0: 'red',
    1: 'red',
    2: 'red',
    3: 'red',
    4: 'red',
    5: 'red',
    6: 'red',
    7: 'red',
    8: 'red',
    9: 'red',
    10: 'red',
    11: 'blue',
    12: 'blue',
    13: 'blue',
    14: 'blue',
    15: 'blue',
    16: 'grey',
    17: 'blue',
    18: 'yellow',
    19: 'blue',
    20: 'blue',
    21: 'green',
    22: 'green',
    23: 'green',
    24: 'green',
    25: 'green',
    26: 'green',
    27: 'green',
    28: 'green',
    29: 'green',
    30: 'green',
    31: 'purple',
    32: 'purple',
    33: 'purple',
    34: 'purple',
    35: 'purple',
    36: 'purple',
    37: 'purple',
    38: 'purple',
    39: 'purple',
    40: 'purple',
    41: 'grey',
    42: 'grey',
    43: 'grey',
    44: 'grey',
    45: 'grey',
    46: 'grey',
    47: 'grey',
    48: 'grey',
    49: 'grey',
    50: 'grey',
    51: 'yellow',
    52: 'yellow',
    53: 'yellow',
    54: 'yellow',
    55: 'yellow',
    56: 'yellow',
    57: 'yellow',
    58: 'yellow',
    59: 'yellow',
    60: 'yellow',
  };

  // set up canvas context for visualizer

  let canvas = document.querySelector('.visualizer');
  let canvasCtx = canvas.getContext('2d');

  let intendedWidth = document.querySelector('.wrapper').clientWidth;

  canvas.setAttribute('width', intendedWidth);

  let drawVisual;

  //main block for doing the audio recording

  if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    let constraints = { audio: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(stream) {
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(distortion);
        distortion.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        convolver.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(audioCtx.destination);

        visualize();
        //  voiceChange();
      })
      .catch(function(err) {
        console.log('The following gUM error occured: ' + err);
      });
  } else {
    console.log('getUserMedia not supported on your browser!');
  }

  function visualize() {
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    analyser.fftSize = 2048;
    let bufferLengthAlt = analyser.frequencyBinCount;
    console.log(bufferLengthAlt);
    let dataArrayAlt = new Uint8Array(bufferLengthAlt);

    // canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    let drawAlt = function() {
      drawVisual = requestAnimationFrame(drawAlt);
      analyser.getByteFrequencyData(dataArrayAlt);

      const newArray = dataArrayAlt.slice(0, 60);
      const newLength = 150;

      let max = 0;
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i] > newArray[max]) {
          max = i;
        }
      }
      const maxColor = colors[max];

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      let barWidth = (WIDTH / newLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < newLength; i++) {
        barHeight = newArray[i];

        canvasCtx.fillStyle = maxColor;
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }

      for (let j = 0 ; j < )
      console.log('this is maxColor', maxColor);
    };

    drawAlt();
    // console.log('this is x', x);
  }
}
