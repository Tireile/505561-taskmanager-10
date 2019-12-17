import { formatDate } from "../utils/common";
import AbstractComponent from "./abstract-component";


const hashtagRender = (tags) => {
  const spanElements = [];
  tags.forEach((item) => {
    spanElements.push(
      `<span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          ${item}
        </span>
      </span>`);
  });
  return spanElements.join(`\n`);
};

const createTaskTemplate = (task) => {
  const { description, dueDate, tags, color, isFavorite, isArchive } = task;

  const formatDueDate = formatDate(dueDate);
  const { day, dayPeriod, hour, minute, month } = formatDueDate;

  return (
    `<article class="card card--${color}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            ${isArchive ? `<button type="button" class="card__btn card__btn--archive">
            archive
          </button>` : ``}
          
          ${isFavorite ? `<button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled"
        >
          favorites
        </button>` : ``}
          
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
          ${dueDate ? `<div class="card__dates">
          <div class="card__date-deadline">
            <p class="card__input-deadline-wrap 
            ${dueDate < new Date() ? `card--deadline` : ``}">
              <span class="card__date">
              ${day} ${month}
              </span>
              <span class="card__time">
              ${hour}:${minute} ${dayPeriod}
              </span>
            </p>
          </div>
        </div>` : ``}
            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${hashtagRender(tags)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  setClickHandler(handler) {
    this
      .getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }
}
