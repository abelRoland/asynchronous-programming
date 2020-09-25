'use strict';

import { logger } from '../../../../lib/logger.js';

export class Segment {

  isChanging = true
  timeoutId = null
  delayFactor = 500
  msDelay = 0
  innerText = ''
  emptyText = '  \n  \n  '
  isDisplayed = true
  coordinates = {}

  constructor(x, y) {
    this.msDelay = this.delayFactor + (x * 5);
    this.innerText = '  \n' + y + '\n\n  ';
    this.coordinates.x = x;
    this.coordinates.y = y;
  }

  handleClick(view) {
    if (this.isChanging) {
      clearTimeout(this.timeoutId);
    } else {
      this.timeoutId = setTimeout(this.timeoutCallback.bind(this, view), this.msDelay);
    };
    this.isChanging = !this.isChanging;

    logger.push({
      coordinates: `${this.coordinates.x}, ${this.coordinates.y}`,
      isChanging: this.isChanging,
      isDisplayed: this.isDisplayed
    });
  }

  timeoutCallback(view) {
    if (this.isChanging) {
      this.isDisplayed = !this.isDisplayed;

      if (!this.isDisplayed) {
        view.innerText = this.emptyText

      }else{
        view.innerText = this.coordinates.y;
      }

      this.timeoutId = setTimeout(this.timeoutCallback.bind(this, view), this.msDelay);
    };
  }

  render() {
    const container = document.createElement('div');
    container.style = 'height: 100%;'
      + 'width: 100%;'
      + 'display: flex;'
      + 'align-items: center;'
      + 'justify-content: center;';
      container.innerHTML = this.coordinates.y;
      container.onclick = this.handleClick.bind(this, container);
      this.timeoutId = setTimeout(
        this.timeoutCallback.bind(this, container),
        this.msDelay);
        
    return container;
  }

}
