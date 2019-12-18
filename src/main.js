import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";

const TASK_COUNT = 18;
const tasks = generateTasks(TASK_COUNT);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters(tasks);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const controller = new BoardController(boardComponent);
controller.render(tasks);


