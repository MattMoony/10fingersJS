// import TenFingers from 'https://cdn.jsdelivr.net/gh/MattMoony/10fingersJS/tenfingers/tenfingers.js';
import TenFingers from './tenfingers/tenfingers.js';

let target = document.getElementById('target'),
    typer = new TenFingers(target);


typer .clear()
      .type('Hello World!')
      .pause(2000)
      .delete(' World!'.length)
      .type(' everyone!')
      .pause(1000)
      .clear()
      .type('This is a statement')
      .pauseS(1)
      .type('.');

let target2 = document.getElementById('target2'),
    typer2 = new TenFingers(target2);

typer2.typeAll([
  '!&copy; MattMoony',
  'Hello World!',
  'Hello Whales!',
  'Hello Wales!',
  'Hello Water!',
  'Hello Mum!',
  'This is a statement',
  'This is a statement.',
]);

let target3 = document.getElementById('target3'),
    typer3 = new TenFingers(target3, {
      typingSpeed: 250,
      deletingSpeed: 125,
      cursorSpeed: .25,
      pauseTimeout: 1000,
      // pauseTimeoutS: 1,
      endTimeout: 3000,
      endStringTimeout: 1000,
      loop: true,
    });

typer3.typeAll([
  'Hello World!',
  'How are you doing?',
  'How are the people around you doing?',
  'Great, it was nice talking to you!',
]);
