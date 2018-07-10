window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  const color = event.data;
  if (!color) counter();
  else {
    animateClick(color);
    $(color).trigger('click');
  }
  // answers.check_answers(color); 
};

var colors = ['#yellow', '#pink', '#green', '#orange'];

var sounds = {
  pink_sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  green_sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  yellow_sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  orange_sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

const counter = () => {
  const timeOut = 1600;

  const container = document.getElementById('counter');
  container.innerText = '3...';
  container.style.display = 'block';


  setTimeout(() => {
    container.innerText = '2...';
    setTimeout(() => {
      container.innerText = '1...';
      setTimeout(() => {
        document.querySelectorAll('iframe')[0].contentWindow.postMessage('capture', "*");
        container.style.display = 'none';
      }, timeOut);
    }, timeOut);
  }, timeOut);


};

function animateClick(id) {
  var cs = id.slice(1, id.length);
  console.log(cs);
  $(id).addClass('clicked-' + cs);
  var s = id.slice(1, 2);
  switch (s) {
    case 'p':
      sounds.pink_sound.play();
      break;
    case 'g':
      sounds.green_sound.play();
      break;
    case 'y':
      sounds.yellow_sound.play();
      break;
    case 'o':
      sounds.orange_sound.play();
      break;
  }
  var time = setTimeout(function () {
    $(id).removeClass('clicked-' + cs);
  }, 400);
}

function animateWithoutSound(id) {
  var cs = id.slice(1, id.length);
  $(id).addClass('clicked-' + cs);
  var timenosound = setTimeout(function () {
    $(id).removeClass('clicked-' + cs);
  }, 400);
}

var question =
{
  name: 'question',

  newQuestion:
    function () {
      game.values.push(colors[Math.floor(4 * Math.random())]);
      game.steps++;
      $('.steps > .text').html(game.steps);
      console.log(game.values);
    },

  playQuestion:
    function () {
      var i = 0;
      var t = setInterval(function () {
        animateClick(game.values[i]);
        if (i >= game.values.length - 1) {
          clearInterval(t);
          game.change_state(question);
          counter();
        }
        else {
          i++;
        }
      }, 800);
    }
};

var answers = {
  name: 'answers',
  index_so_far: 0,
  total_correct: 0,

  init_answers:
    function () {
      $(".simon").removeClass('disabled');
      answers.index_so_far = 0;
      answers.total_correct = game.values.length;
    },

  check_answers:
    function (id) {
      if (id == game.values[answers.index_so_far]) {
        answers.index_so_far++;
        if (answers.index_so_far >= answers.total_correct) {
          game.change_state(answers);
          return false;
        }
        return true;
      }
      else {
        game.lose();
        return false;
      }
    }
};

var game =
{
  state: question,
  values: [],
  mode: 'easy',
  steps: 0,
  reset:
    function () {
      game.steps = 0;
      game.state = question;
      game.values = [];
      $('.steps > .text').html(game.steps);
    },

  start:
    function () {
      game.reset();
      $('.status').html('game');
      $('.simon').addClass('disabled');
      question.newQuestion();
      question.playQuestion();
    },

  change_state:
    function (state) {
      if (state.name == 'question') {
        game.state = answers;
        answers.init_answers();
      }
      else {
        game.state = question;
        $('.simon').addClass('disabled');
        if (game.steps >= 20) {
          game.stop();
        }
        else {
          question.newQuestion();
          setTimeout(question.playQuestion, 1000);
        }
      }
    },

  lose:
    function () {
      $('.status').html('loss');
      if (game.mode == 'strict') {
        game.celebrate(700, 2);
        setTimeout(game.start, 1200);
      }
      else {
        game.state = question;
        $('.simon').addClass('disabled');
        game.celebrate(700, 2);
        setTimeout(function () {
          $('.status').html('game');
          question.playQuestion();
        }, 1200);
      }
    },

  stop:
    function () {
      $('.status').html('win');
      game.celebrate(700, 3);
      game.reset();
    },

  celebrate:
    function (interval, number) {
      for (var j = 0; j < number; j++) {
        setTimeout(function () {
          for (var i in colors) {
            animateWithoutSound(colors[i]);
          }
          sounds.green_sound.play();
        }, j * interval);
      }
    }
};

$(document).ready(function () {
  $(".logo").on('click', () => counter());

  sounds.pink_sound.load();
  sounds.green_sound.load();
  sounds.yellow_sound.load();
  sounds.orange_sound.load();
  $('.simon').on('click', function (e) {
    var id = '#' + e.target.id;
    var s = id.slice(1, 2);
    switch (s) {
      case 'p': sounds.pink_sound.play(); break;
      case 'g': sounds.green_sound.play(); break;
      case 'y': sounds.yellow_sound.play(); break;
      case 'o': sounds.orange_sound.play(); break;
    }
    if (game.state.name == 'answers') {
      const hasMore = answers.check_answers(id);
      if (hasMore) counter();
    }
  });

  $('.start').on('click', function () {
    game.start();
  });

  $('.strict').on('click', function () {
    if (game.mode == 'easy') {
      game.mode = 'strict';
      $(this).html('strict');
    }
    else {
      game.mode = 'easy';
      $(this).html('easy');
    }
  });

});
