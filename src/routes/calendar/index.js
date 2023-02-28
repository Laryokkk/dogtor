import CalendarBox from '/src/lib/calendar/index.js';

const cb = new CalendarBox(document.querySelector('.container'), {time: ['04:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']});
cb.init();