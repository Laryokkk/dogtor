export const getParam = (wind, name) => {
    const queryString = wind.location.search;
    const urlParams = new URLSearchParams(queryString);
    const response = urlParams.get(name);

    return response;
};

export const hasParam = (wind, name) => {
    const queryString = wind.location.search;
    const urlParams = new URLSearchParams(queryString);
    const response = urlParams.has(name);

    return response;
};