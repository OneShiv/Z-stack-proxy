export const searchQuestion = (payload) => {
    const { query_string, tag, score, unanswered, accepted } = payload;
    const request = fetch(`https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&q=${query_string}&tagged=${tag}&score=${score && 3}&site=stackoverflow&accepted=${accepted}&unanswered=${unanswered}`);
    return request.then(response => response.json())
}

export const getTopTags = () => {
    const request = fetch(`https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow&pagesize=5`);
    return request.then(response => response.json())
}