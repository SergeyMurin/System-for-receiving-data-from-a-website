const AXIOS = require("axios");
const CHEERIO = require("cheerio");

const URL = `https://www.ign.com/articles/top-25-best-anime-series-of-all-time`;

const AnimeListItem = {
    name: "",
    imageURL: "",
    description: "",
    rank: "",
}


AXIOS.get(URL).then(({data}) => {

    const $ = CHEERIO.load(data);
    const articlePage = $(".article-page");
    const animeList = [];

    const initializeAnimeItem = (node) => {
        $(node).children("h2").each(( i,el) => {
            const element = $(el);

            if (element.text().length !== 0) {
                let animeItem = new Object(AnimeListItem);

                const rankAndName = splitName(element.text());
                animeItem.name = rankAndName[1];
                animeItem.rank = rankAndName[0];

                const imgElement = $(element.next().children().children().html())
                animeItem.imageURL = imgElement.attr("src");

                animeList.push(animeItem);
            }
        })
    }

    const findSrc = (node) => {
        console.log(node.find("img"))
    }

    const splitName = (str) => {
        return str.split(". ");
    }

    initializeAnimeItem(articlePage);
    console.log(animeList);


}).catch((error) => console.error(error));