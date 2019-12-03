const filterNames = {
  all: (tasks) => allTasksCount(tasks),
  overdue: (tasks) => overdueTasksCount(tasks),
  today: (tasks) => todayTasksCount(tasks),
  favorites: (tasks) => favoritesTasksCount(tasks),
  repeating: (tasks) => isRepeatTasksCount(tasks),
  tags: (tasks) => tagsTasksCount(tasks),
  archive: (tasks) => archiveTasksCount(tasks)
};

const allTasksCount = (tasks) => {
  const count = Object.keys(tasks);
  return count.length;
};

const overdueTasksCount = (tasks) => {
  let count = 0;

  tasks.forEach((task) => task.dueDate < new Date() ? count++ : count);
  return count;
};

const todayTasksCount = (tasks) => {
  let count = 0;
  tasks.forEach((task) => {
    if (task.dueDate === null) {
      return count;
    }
    const today = new Date();
    return task.dueDate.getDate() === today.getDate() ? count++ : count;
  });
  return count;
};

const favoritesTasksCount = (tasks) => {
  let count = 0;
  tasks.forEach((task) => task.isFavorite ? count++ : count);
  return count;
};

const isRepeatTasksCount = (tasks) => {
  let count = 0;
  tasks.forEach((task) => {
    const isRepeat = Object.keys(task.repeatingDays)
      .map((item) => task.repeatingDays[item])
      .every((item) => item === false);
    return isRepeat === true ? count++ : count;
  });
  return count;
};

const tagsTasksCount = (tasks) => {
  const tagsSetCount = new Set();
  tasks.forEach((task) => tagsSetCount.add(...task.tags));
  return tagsSetCount.size;
};

const archiveTasksCount = (tasks) => {
  let count = 0;
  tasks.forEach((task) => task.isArchive ? count++ : count);
  return count;
};

export const generateFilters = (tasks) => Object.keys(filterNames).map((key) => {
  const countFn = filterNames[key];
  return {
    name: key,
    count: countFn(tasks)
  };
});
