import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import SortComponent from "../components/sort";
import TasksComponent from "../components/tasks";
import NoTasksComponent from "../components/no-tasks";
import LoadMoreButtonComponent from "../components/load-more-btn";
import { render, RenderPosition, remove } from "../utils/render";



const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
    const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
            replaceEditToTask();
            document.removeEventListener(`keydown`, onEscKeyDown);
        }
    };

    const replaceEditToTask = () => {
        taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
    };

    const replaceTaskToEdit = () => {
        taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    };

    const taskComponent = new TaskComponent(task);
    taskComponent.setClickHandler(() => {
        replaceTaskToEdit();
        document.addEventListener(`keydown`, onEscKeyDown);
    });

    const taskEditComponent = new TaskEditComponent(task);
    taskEditComponent.setSubmitHandler(replaceEditToTask);

    render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderTasks = (taskListElement, tasks) => {
    tasks.forEach((task) => renderTask(taskListElement, task));
}

export default class BoardController {
    constructor(container) {
        this._container = container;
        this._tasksComponent = new TasksComponent();
        this._sortComponent = new SortComponent();
        this._noTasksComponent = new NoTasksComponent();
        this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    }

    render(tasks) {
        const renderLoadMoreButton = () => {
            if (showingTasksCount >= tasks.length) {
                return;
            }

            render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

            this._loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
                const prevTaskCount = showingTasksCount;
                showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

                renderTasks(taskListElement, tasks.slice(prevTaskCount, showingTasksCount));

                if (showingTasksCount >= tasks.length) {
                    remove(this._loadMoreButtonComponent);
                }
            });
        }

        const container = this._container.getElement();

        const isAllTasksArchived = tasks.every((task) => task.isArchive);

        if (isAllTasksArchived) {
            render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
            return;
        }

        render(container, this._sortComponent, RenderPosition.BEFOREEND);
        render(container, this._tasksComponent, RenderPosition.BEFOREEND);

        const taskListElement = this._tasksComponent.getElement();
        let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

        renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
        renderLoadMoreButton();
    }
}