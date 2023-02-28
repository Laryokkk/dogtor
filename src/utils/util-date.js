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

    return new Date(currentDate.setDate(diff));
};

const getCurrentLastDay = () => {
    const currentFirstDay = getCurrentFirstDay();
    const currentLastDay = new Date(currentFirstDay);

    return currentLastDay.setDate(currentLastDay.getDate() + 6);
};

const isValidDate = (dateString) => {
    if (typeof dateString !== 'string') {
        return false;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return false;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (year < 0 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (dateString < currentDate) {
      return false;
    }
    return true;
}

export { formatDate, getCurrentFirstDay, getCurrentLastDay,isValidDate };

