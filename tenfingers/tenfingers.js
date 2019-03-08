class TypingEvent {
  constructor(data, func) {
    this.data = data;
    this.func = func;
  }
}

export class TenFingers {
  constructor(target, args) {
    this.target = target;
    args = args || {};

    this.eventLoop = [];
    this.handling = false;

    // -- SPECIFY FURTHER ARGS -- //
    this.typingSpeed = args.typingSpeed || 250;
    this.deletingSpeed = args.deletingSpeed || this.typingSpeed;
    this.cursorSpeed = args.cursorSpeed || .5;
    this.pauseTimeout = args.pauseTimeout || args.pauseTimeoutS*1000 || 2000;

    this.setup();
  }

  setup() {
    let style = document.createElement('style');
    style.type = 'text/css';

    let tags = `
      @keyframes tenfingersjs-animations-cursor {
        from { background-color: #000; }
        to { background-color: rgba(0,0,0,0); }
      }

      .tenfingersjs-tags-target {
        display: flex;
      }

      .tenfingersjs-tags-cursor {
        display: inline-block;
        box-sizing: border-box;
        width: 2px;
        background-color: #3B3B3B;
        border-radius: 2.5px;
        animation: tenfingersjs-animations-cursor ${this.cursorSpeed}s linear 0s infinite alternate;
      }

      .tenfingersjs-tags-content {
        vertical-algin: center;
        font-size: inherit;
        height: 100%;
      }
    `;

    if (style.styleSheet) style.styleSheet.cssText = tags;
    else style.appendChild(document.createTextNode(tags));
    document.body.appendChild(style);

    this.target.classList.add('tenfingersjs-tags-target');

    let cursor = document.createElement('span');
    cursor.classList.add('tenfingersjs-tags-cursor');
    this.cursor = cursor;

    let content = document.createElement('span');
    content.classList.add('tenfingersjs-tags-content');
    this.content = content;

    this.target.appendChild(this.content);
    this.target.appendChild(this.cursor);
  }

  handleNextEvent() {
    if (this.eventLoop.length === 0) {
      this.handling = false;
      return;
    }

    this.handling = true;
    let nEvent = this.eventLoop.splice(0,1)[0];
    nEvent.func(nEvent.data, this.handleNextEvent.bind(this));
  }

  addEvent(data, func) {
    this.eventLoop.push(new TypingEvent(data, func));

    if (!this.handling)
      this.handleNextEvent();
    return this;
  }

  type(text) {
    return this.addEvent(text, this.typeWCallback.bind(this));
  }

  typeWCallback(text, callback) {
    var ind = 0,
      tInterval = window.setInterval(() => {
        this.content.innerHTML = this.content.innerHTML + text[ind++];

        if (ind >= text.length) {
          window.clearInterval(tInterval);
          callback();
        }
      }, this.typingSpeed);
  }

  delete(chars) {
    return this.addEvent(chars, this.deleteWCallback.bind(this));
  }

  deleteWCallback(chars, callback) {
    var i = 0,
      tInterval = window.setInterval(() => {
        this.content.innerHTML = this.content.innerHTML.substr(0, this.content.innerHTML.length-1);

        if (++i >= chars) {
          window.clearInterval(tInterval);
          callback();
        }
      }, this.deletingSpeed);
  }

  clear() {
    this.addEvent(null, this.clearWCallback.bind(this));
  }

  clearWCallback(x, callback) {
    this.deleteWCallback(this.content.innerHTML.length, callback);
  }

  pause(t) {
    return this.addEvent(t||this.pauseTimeout, this.pauseWCallback.bind(this));
  }

  pauseS(t) {
    return this.addEvent(t*1000||this.pauseTimeout, this.pauseWCallback.bind(this));
  }

  pauseWCallback(t, callback) {
    var pTimeout = window.setTimeout(() => {
      callback();
    }, t);
  }
};
