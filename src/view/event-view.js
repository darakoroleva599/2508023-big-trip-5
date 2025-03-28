import { createElement } from '../render.js';
import { extractDate, extractTime, calculateFlightTime, getRandomInteger } from '../../utils.js';

const createEventTemplate = (point) => {
  const {dateFrom, dateTo, price, offers, type, isFavorite} = point;
  const date = extractDate(dateFrom);
  const startTime = extractTime(dateFrom);
  const endTime = extractTime(dateTo);
  const activeFavorite = isFavorite ? '--active' : '';

  return (`
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${date}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${dateFrom}>${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime=${dateTo}>${endTime}</time>
      </p>
      <p class="event__duration">${calculateFlightTime(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
        <span class="event__offer-title">${offers[getRandomInteger(0,4)].type}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offers[getRandomInteger(0,4)].offer[getRandomInteger(0,4)].price}</span>
      </li>
    </ul>
    <button class="event__favorite-btn event__favorite-btn${activeFavorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
`);
};

export default class EventView {
  constructor({point}){
    this.point = point;
  }

  getTemplate(){
    return createEventTemplate(this.point);
  }

  getElement(){
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
