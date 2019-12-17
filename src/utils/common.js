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
