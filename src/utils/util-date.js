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

export { formatDate, getCurrentFirstDay, getCurrentLastDay };