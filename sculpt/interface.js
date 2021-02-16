const Interface = function(el) {
    this.el = el;
    this.down = loc => {};
    this.move = loc => {};
    this.up = loc => {};

    el.ontouchstart = (e) => (this.handleEvents(e), e.preventDefault());
    el.onmousedown = (e) => this.handleEvents(e);
  }
  
  Interface.prototype.handleEvents = function(e) {
    let ev2, ev3;
    e.type === 'touchstart' && (ev2 = 'touchmove', ev3 = 'touchend');
    e.type === 'mousedown' && (ev2 = 'mousemove', ev3 = 'mouseup');

    const func1 = (e) => {
      let loc = this.getLoc(e);
      this.down(loc);
    };
    const func2 = (e) => {
      let loc = this.getLoc(e);
      this.move(loc);
    };
    const func3 = (e) => {
      let loc = this.getLoc(e);
      this.up(loc);
      document.removeEventListener(ev2, func2);
      document.removeEventListener(ev3, func3);
    }
  
    func1(e);
    document.addEventListener(ev2, func2);
    document.addEventListener(ev3, func3);
  }
  
  Interface.prototype.getLoc = function(e) {
    let type, rect, width, height, x, y;
    type = e.type;
    rect = this.el.getBoundingClientRect();
    width = rect.right - rect.left;
    height = rect.bottom - rect.top;
    
    if (type === "touchstart" || type === "touchmove") {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }
    if (type === "touchend") {
      x = e.changedTouches[0].clientX - rect.left;
      y = e.changedTouches[0].clientY - rect.top;
    } 
    if (type === "mousedown" || type === "mousemove" || type === "mouseup") { 
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    x > width && (x = width);
    x < 0 && (x = 0);
    y > height && (y = height);
    y < 0 && (y = 0);

    return {width, height, x, y}
  }