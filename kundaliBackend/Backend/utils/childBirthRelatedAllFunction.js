function getSixthDayLater(birthDate) {
  const inputDate = new Date(birthDate);

  const addDays = (base, days) => {
    const date = new Date(base);
    date.setDate(date.getDate() + days);
    return date;
  };

  const fourthDay = addDays(inputDate, 4-1);
  const fifthDay = addDays(inputDate, 5-1);
  const sixthDay = addDays(inputDate, 6-1);
  const seventhDay = addDays(inputDate, 7-1);
  const tenthDay = addDays(inputDate, 10-1);
  const eleventhDay = addDays(inputDate, 11-1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  sixthDay.setHours(0, 0, 0, 0);

  if (today > sixthDay) return null;

  const response = {
    sixthDay: formatDate(sixthDay),
    seventhDay: formatDate(seventhDay)
  };

  const fifthDayOfWeek = fifthDay.getDay(); // 0=Sun, 6=Sat
  const tenthDayOfWeek = tenthDay.getDay();

  // 5th day logic
  if ([2, 4, 6].includes(fifthDayOfWeek)) {
    response.fourthDay = formatDate(fourthDay);
  } else {
    response.fifthDay = formatDate(fifthDay);
  }

  // 10th/11th day logic
  if ([2, 4, 6].includes(tenthDayOfWeek)) {
    response.eleventhDay = formatDate(eleventhDay);
  } else {
    response.tenthDay = formatDate(tenthDay);
  }

  return response;
}

function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

module.exports = { getSixthDayLater };
