// import TenFingers from 'https://cdn.jsdelivr.net/gh/MattMoony/10fingersJS/tenfingers/tenfingers.js';
import TenFingers from './tenfingers/tenfingers.js';

let target = document.getElementById('target'),
    typer = new TenFingers(target);


// typer .clear()
//       .type('Hello World!')
//       .pause(2000)
//       .delete(' World!'.length)
//       .type(' everyone!')
//       .pause(1000)
//       .clear()
//       .type('This is a statement')
//       .pauseS(1)
//       .type('.');

typer.typeAll([
  '!&copy; MattMoony',
  'Hello World!',
  'Hello Whales!',
  'Hello Wales!',
  'Hello Water!',
  'Hello Mum!',
  'This is a statement',
  'This is a statement.',
]);
