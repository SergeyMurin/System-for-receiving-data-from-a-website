const AXIOS = require("axios");
const CHEERIO = require("cheerio")

const QUERY = "парсинг";

const URL = `https://habr.com/ru/search/?q=${QUERY}`;



AXIOS.get(URL).then(data => {
    const $ = CHEERIO.load(data.data);
    const headers = [];
    $(".content-list_posts").each((index, element) => {
        headers.push($(element).text());
    })
    console.log(headers);
});

