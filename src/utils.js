export const formatDate = (date) => {
  const formatDueDate = Object.fromEntries(
      new Intl.DateTimeFormat(`en-US`, {
        hourCycle: `h12`,
        day: `2-digit`,
        month: `long`,
        hour: `numeric`,
        minute: `numeric`
      })
      .formatToParts(date)
      .map((el) => [el.type, el.value])
  );
  return formatDueDate;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
