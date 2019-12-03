import {formatDate} from "../utils";
import {Colors} from "../const";

const hashtagRender = (tags) => {
  const spanElements = [];
  tags.forEach((item) => {
    spanElements.push(`<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="repeat"
      class="card__hashtag-hidden-input"
    />
    <p class="card__hashtag-name">
      #${item}
    </p>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`);
  });
  return spanElements.join(`\n`);
};

const repeatingDaysRender = (repeatingDays) => Object.keys(repeatingDays).map((key) => `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${key}-4"
      name="repeat"
      value="${key}"
      ${repeatingDays[key] ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${key}-4"
      >${key}</label
    >`).join(`\n`);

const colorsRender = (colors) => {
  const colorElements = colors.map((item) => {
    return `<input
  type="radio"
  id="color-${item}-4"
  class="card__color-input card__color-input--${item} visually-hidden"
  name="color"
  value="${item}"
  
/>
<label
  for="color-${item}-4"
  class="card__color card__color--${item}"
  >${item}</label
>`;
  });
  return colorElements.join(`\n`);
};

const getIsRepeat = (repeatingDays) => {
  const isRepeat = Object.keys(repeatingDays)
    .map((item) => repeatingDays[item])
    .every((item) => item === false);
  return isRepeat;
};

export const createTaskEditTemplate = (task) => {
  const {description, dueDate, repeatingDays, tags, color} = task;
  const formatDueDate = formatDate(dueDate);

  const {day, dayPeriod, hour, minute, month} = formatDueDate;

  return `<article class="card card--edit card--${color} card--repeat">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
  
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>
  
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">
                  ${dueDate ? `yes` : `no`}</span>
                </button>
                ${
  dueDate
    ? `<fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${day} ${month} ${hour}:${minute} ${dayPeriod}"
                  />
                </label>
              </fieldset>`
    : ``
}
                
  
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${
  getIsRepeat(repeatingDays) ? `no` : `yes`
}</span>
                </button>
  
                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                  ${repeatingDaysRender(repeatingDays)}
                  </div>
                </fieldset>
              </div>
  
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                ${hashtagRender(tags)}
                </span>
                </div>
  
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>
  
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
              ${colorsRender(Colors)}
              </div>
            </div>
          </div>
  
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`;
};
