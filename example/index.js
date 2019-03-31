// -- For performance measuring -- //
let start;

// -- 1st target -- //

console.log('%c#01 Target', 'color: #FF8383; font-size: 1.25em; font-weight: bold; font-family: sans-serif;');
start = performance.now();

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

console.log(`%cTotal time taken: %c${performance.now()-start}ms`, 'font-weight: bold; font-family: sans-serif;',
  'font-family: monospace; font-weight: inherit;');

// -- 2nd target -- //

console.log('%c#02 Target', 'color: #FF8383; font-size: 1.25em; font-weight: bold; font-family: sans-serif;');
start = performance.now();

let target2 = document.getElementById('target2'),
    typer2 = new TenFingers(target2);

typer2.typeAll([
  '&#128519;',
  '!&copy; MattMoony',
  'Hello World!',
  'Hello Whales!',
  'Hello Wales!',
  'Hello Water!',
  'Hello Mum!',
  'This is a statement',
  'This is a statement.',
]);

console.log(`%cTotal time taken: %c${performance.now()-start}ms`, 'font-weight: bold; font-family: sans-serif;',
  'font-family: monospace; font-weight: inherit;');

console.log('%c#03 Target', 'color: #FF8383; font-size: 1.25em; font-weight: bold; font-family: sans-serif;');
start = performance.now();

// -- 3rd target -- //

let target3 = document.getElementById('target3'),
    typer3 = new TenFingers(target3, {
      typingSpeed: 250,
      deletingSpeed: 125,
      cursorSpeed: .25,
      cursorChar: '$',
      pauseTimeout: 1000,
      // pauseTimeoutS: 1,
      endTimeout: 3000,
      endStringTimeout: 1000,
      loop: true,
    });

typer3.typeAll([
  '&num;great',
  '#source_div',
  'Hello World!',
  'How are you doing?',
  'How are the people around you doing?',
  'Great, it was nice talking to you!',
]);

console.log(`%cTotal time taken: %c${performance.now()-start}ms`, 'font-weight: bold; font-family: sans-serif;',
  'font-family: monospace; font-weight: inherit;');
