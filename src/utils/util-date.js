const formatDate = (startDate, endDate) => {
    const startDay = startDate.getUTCDate();
    const endDay = endDate.getDate();
    const endMounth = endDate.toLocaleString('default', { month: 'long' });
    const endYear = endDate.getUTCFullYear();

    return `${startDay} - ${endDay} ${endMounth} ${endYear}`;
};

const getCurrentFirstDay = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const diff = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const date = new Date(currentDate.setDate(diff));
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    return date;
};

const getCurrentLastDay = () => {
    const currentFirstDay = getCurrentFirstDay();
    const currentLastDay = new Date(currentFirstDay);
    const date = new Date(currentLastDay.setDate(currentLastDay.getDate() + 6));
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    return date;
};

const isValidBirthdayDate = (dateString) => {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return false;
    }
  
    const components = dateString.split('-');
    if (
      date.getFullYear() !== Number(components[0]) ||
      date.getMonth() !== Number(components[1]) - 1 ||
      date.getDate() !== Number(components[2])
    ) {
      return false;
    }
  
    return true;
  };

export { formatDate, getCurrentFirstDay, getCurrentLastDay, isValidBirthdayDate };
