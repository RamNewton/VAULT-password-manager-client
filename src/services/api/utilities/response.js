export function handleResponse(response) {
    if (response.results) {
        return response.results;
    }

    if (response.data) {
        console.log(response);
        return response.data;
    }

    return response;
}

export function handleError(error) {
    console.log(error);
    return Promise.reject(error);
}
