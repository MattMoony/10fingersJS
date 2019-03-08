import { TenFingers } from './tenfingers/tenfingers.js';

let target = document.getElementById('target'),
    typer = new TenFingers(target);


typer.type('Hello World!')
      .pause(2000)
      .delete(' World!'.length)
      .type(' everyone!')
      .clear();
