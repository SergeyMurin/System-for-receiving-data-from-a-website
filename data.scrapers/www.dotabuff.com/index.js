const axios = require("axios");
const cheerio = require("cheerio");
//leaderboard

const URL = "https://www.dotabuff.com/players/leaderboard?page=1";

const listItem = {}

const urlPagination = (url) => {
    let newUrl = url;
    const splitSelector = "?page=";
    const urlParts = url.split(splitSelector);
    let pageNumber = parseInt(urlParts[1]);
    newUrl = `${urlParts[0]}${splitSelector}${++pageNumber}`;
    return newUrl;
}

const run = () => {
    let $ = cheerio.load("");
    let url = URL;

    axios.get(URL).then(({data}) => {
        $ = cheerio.load(data);
        console.log("")
    }).then(() => {
        const topLayerSelector = "tbody";


    }).catch(error => console.log(error));
}

run();