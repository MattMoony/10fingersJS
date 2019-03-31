class TypingEvent {
  constructor(data, func, args) {
    this.data = data;
    this.func = func;

    args = args || {};
    this.once = args.once || false;
  }
}

class TenFingers {
  constructor(target, args) {
    this.target = target;
    args = args || {};

    // -- SPECIFY FURTHER ARGS -- //
    this.typingSpeed = args.typingSpeed || 125;
    this.deletingSpeed = args.deletingSpeed || this.typingSpeed-50;
    this.cursorSpeed = args.cursorSpeed || .5;
    this.pauseTimeout = args.pauseTimeout || args.pauseTimeoutS*1000 || 2000;
    this.endTimeout = args.endTimeout || 4000;
    this.endStringTimeout = args.endStringTimeout || 1250;

    this.cursorChar = args.cursorChar || '|';

    this.loop = args.loop || true;
    this.eventQueueIndex = 0;

    this.eventQueue = [new TypingEvent(this.endTimeout, this.pauseWCallback)];
    this.handling = false;

    this.setup();
  }

  setup() {
    let style = document.createElement('style');
    style.type = 'text/css';

    let tags = `
      @keyframes tenfingersjs-animations-cursor {
        from { color: #000; }
        to { color: rgba(0,0,0,0); }
      }

      .tenfingersjs-tags-target {
        display: inline-block;
        overflow-wrap: break-word;
      }

      .tenfingersjs-tags-cursor {
        color: #3B3B3B;
        font-weight: bolder;
        animation: tenfingersjs-animations-cursor ${this.cursorSpeed}s linear 0s infinite alternate;
      }

      .tenfingersjs-tags-content {
        display: inline;
        vertical-align: middle;
        font-size: inherit;
        padding: 0;
        margin: 0;
      }
    `;

    if (style.styleSheet) style.styleSheet.cssText = tags;
    else style.appendChild(document.createTextNode(tags));
    document.body.appendChild(style);

    this.target.classList.add('tenfingersjs-tags-target');

    let cursor = document.createElement('span');
    cursor.classList.add('tenfingersjs-tags-cursor');
    cursor.innerHTML = this.cursorChar;
    this.cursor = cursor;

    let content = document.createElement('span');
    content.classList.add('tenfingersjs-tags-content');
    this.content = content;

    this.target.appendChild(this.content);
    this.target.appendChild(this.cursor);
  }

  getNextEvent() {
    this.eventQueueIndex = this.eventQueueIndex%this.eventQueue.length;

    if (this.loop) {
      let nextE = this.eventQueue[this.eventQueueIndex++];

      if (nextE.once)
        this.eventQueue.splice(--this.eventQueueIndex, 1);

      return nextE;
    }

    return this.eventQueue.splice(0,1)[0];
  }

  handleNextEvent() {
    if (this.eventQueue.length === 0) {
      this.handling = false;
      return;
    }

    this.handling = true;
    let nEvent = this.getNextEvent();
    nEvent.func(nEvent.data, this.handleNextEvent.bind(this));
  }

  addEvent(data, func, args) {
    this.eventQueue.push(this.eventQueue[this.eventQueue.length-1]);
    this.eventQueue[this.eventQueue.length-2] = new TypingEvent(data, func, args);

    if (!this.handling)
      this.handleNextEvent();
    return this;
  }

  getCharsToDelete(before, after) {
    for (var i = 0; before[i] === after[i] && i <= after.length && i <= before.length; i++) {}
    return before.length-i;
  }

  type(text) {
    return this.addEvent(text, this.typeWCallback.bind(this));
  }

  typeById(id) {
    return this.addEvent(document.getElementById(id).innerHTML, this.typeWCallback.bind(this));
  }

  typeWCallback(text, callback) {
    var i = 0,
        p = /(?:&\w+;|&#\d+;)/gm,
        t_parts = [],
        m;

    while (m = p.exec(text)) {
      for (; i < m.index; i++) {
        t_parts.push(text[i]);
      }

      t_parts.push(text.substr(m.index, p.lastIndex-m.index))
      i = p.lastIndex;
    }

    for (; i < text.length; i++)
      t_parts.push(text[i]);

    var ind = 0,
      tInterval = window.setInterval(() => {
        this.content.innerHTML = this.content.innerHTML + t_parts[ind++];

        if (ind >= t_parts.length) {
          window.clearInterval(tInterval);
          callback();
        }
      }, this.typingSpeed);
  }

  typeAll(strings) {
    this.addEvent(strings[0], this.typeWCallback.bind(this), {once: true});
    this.addEvent(this.endStringTimeout, this.pauseWCallback.bind(this), {once: true});

    let l_string = strings[0];

    strings.slice(1).forEach(s => {
      if (s.startsWith('#'))
        s = document.getElementById(s.substr(1)).innerHTML;

      let rm_chars = this.getCharsToDelete(l_string, s);

      this  .delete(rm_chars)
            .type(s.substr(l_string.length-rm_chars))
            .pause(this.endStringTimeout);

      l_string = s;
    });
    this.pause(this.endTimeout);

    let rm_chars = this.getCharsToDelete(l_string, strings[0]);

    this.delete(rm_chars)
        .type(strings[0].substr(l_string.length-rm_chars))
        .pause(this.endStringTimeout);

    this.eventQueue.pop();
  }

  delete(chars) {
    return this.addEvent(chars, this.deleteWCallback.bind(this));
  }

  deleteWCallback(chars, callback) {
    var i = 0,
      tInterval = window.setInterval(() => {
        if (i++ >= chars) {
          window.clearInterval(tInterval);
          callback();
        } else {
          this.content.innerHTML = this.content.innerHTML.substr(0, this.content.innerHTML.length-1);
        }
      }, this.deletingSpeed);
  }

  clear() {
    return this.addEvent(null, this.clearWCallback.bind(this));
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
}
