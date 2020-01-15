export const searchQuestion = (searchString) => {
    const request = fetch(`https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=${searchString}&site=stackoverflow`);
    return request.then(response => response.json())
}