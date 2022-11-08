const axios = require("axios");
const cheerio = require("cheerio");
const {utilities} = require("../../auxiliary.utilities");


const URL = `https://www.ign.com/articles/top-25-best-anime-series-of-all-time`;

const listItem = {
    name: undefined,
    imageURL: undefined,
    description: undefined,
    rank: undefined,
}


const run = () => {
    axios.get(URL).then(({data}) => {

        const $ = cheerio.load(data);
        const articlePage = $(".article-page");

        const initItems = (node) => {
            const list = [];
            const selectedTags = utilities.callMethodChildren($(node), null, ["h2"]);
            selectedTags.each((i, el) => {
                const element = $(el);
                if (element.text().length !== 0) {
                    let item = Object.assign({}, listItem);

                    const rankAndName = splitName(element.text());
                    item.name = rankAndName[1];
                    item.rank = rankAndName[0];

                    const imgElement = $(utilities.callMethodChildren(utilities.callMethodNext(element, 1), 2).html());
                    item.imageURL = imgElement.attr("src");
                    item.description = utilities.callMethodNext(element, 2).text();

                    list.push(item);
                }
            });
            return list;
        }

        const splitName = (str) => {
            return str.split(". ");
        }

        const list = initItems(articlePage);
        console.log(list);

    }).catch((error) => console.error(error));
}

run();