import { createBoardTemplate } from "./components/board";
import { createSiteMenuTemplate } from "./components/site-menu";
import { createFilterTemplate } from "./components/filter";
import { createTaskTemplate } from "./components/task";
import { createTaskEditTemplate } from "./components/task-edit";
import { createLoadMoreButtonTemplate } from "./components/load-more-btn";

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate());

new Array(TASK_COUNT)
  .fill(``)
  .forEach(() => render(taskListElement, createTaskTemplate()));

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());
