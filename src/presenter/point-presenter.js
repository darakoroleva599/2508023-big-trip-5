import { replace, render, remove } from '../framework/render';
import { UserAction, UpdateType } from '../const.js';
import AddEventView from '../view/add-event-view';
import EventView from '../view/event-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter{
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventViewComponent = null;
  #pointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}){
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevEventViewComponent = this.#eventViewComponent;
    const prevPointComponent = this.#pointComponent;

    this.#eventViewComponent = new EventView({
      point: this.#point,
      onOpenEventClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointComponent = new AddEventView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevEventViewComponent === null && prevPointComponent === null) {
      render(this.#eventViewComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent?.element)) {
      replace(this.#pointComponent, prevPointComponent);
      return;
    }

    if (this.#pointListContainer.contains(prevEventViewComponent?.element)) {
      replace(this.#eventViewComponent, prevEventViewComponent);
    }

    remove(prevEventViewComponent);
    remove(prevPointComponent);
  }

  destroy(){
    remove(this.#eventViewComponent);
    remove(this.#pointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#pointComponent, this.#eventViewComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#eventViewComponent, this.#pointComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFormSubmit = (update) => {
    const isPatchUpdate = (this.#point.type !== update.type) || (this.#point.destination !== update.destination);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update
    );
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
