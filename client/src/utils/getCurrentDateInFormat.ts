export const getCurrentDateInFormat = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const monthOfYear = monthsOfYear[today.getMonth()];
  const dayOfMonth = today.getDate();

  const formattedDate = `${dayOfWeek}, ${monthOfYear} ${dayOfMonth}`;
  return formattedDate;
};

export const getDateAndTimeInFormat = (date: Date) => {
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthOfYear = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();

  const time = date.toLocaleTimeString().slice(0, 5);

  const result = `${time}, ${monthOfYear} ${dayOfMonth}`;
  return result;
};
