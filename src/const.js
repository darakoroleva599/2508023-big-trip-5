import { getRandomInteger } from './utils/common.js';
import dayjs from 'dayjs';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

const DESTINATIONS = ['Paris', 'Madrid', 'New-York', 'Moskow', 'London', 'Berlin', 'Rome', 'Tokyo', 'Rio', 'Egypt'];

const OFFERS = ['Upgrade to a business class', 'Rent a car', 'Add luggage', 'Book tickets', 'Choose seats', 'Add meal'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const BLANK_POINT = {
  id: 0,
  type: POINT_TYPES[0],
  destination: null,
  dateFrom: dayjs().format('DD/MM/YY HH:mm'),
  dateTo: dayjs().format('DD/MM/YY HH:mm'),
  offers: null,
  price: 0,
  pictures: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    },
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
      description: ''
    }
  ],
  isFavorite: false,
};

export { POINT_TYPES, DESCRIPTIONS, DESTINATIONS, OFFERS, FilterType, SortType, UpdateType, UserAction, BLANK_POINT };
