const axios = require("axios");
const cheerio = require("cheerio");
const {utilities} = require("../auxiliary.utilities");

const URL = "https://nationaltoday.com";

const listItem = {
    title: undefined,
    excerpt: undefined,
    URL: undefined,
    shares: undefined,
    imageURL: undefined,
    date: {
        day: undefined,
        date: undefined,
    },
};


const events = {
    holidays: "holidays",
    birthdays: "birthdays",
};

const makeNewURL = (url, event) => {
    const month = getCurrentMonthName();
    const date = getCurrentDate();
    return `${url}/${month.toLocaleLowerCase()}-${date}-${event in events ? event : events.holidays}`;
};

const getCurrentMonthName = () => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    return month[date.getMonth()];
};

const getCurrentDate = () => {
    const date = new Date();
    return date.getDate();
};


const run = () => {
    let list = [];
    let $ = cheerio.load("");
    const url = makeNewURL(URL);

    axios.get(url).then(({data}) => {
        $ = cheerio.load(data);
    }).then(() => {
        const topLayerSelector = ".day-card";
        const list = [];

        $(topLayerSelector).each((index, element) => {
            const item = Object.create(listItem);
            item.URL = utilities.callMethodChildren(element, 3).attr("href");
            item.imageURL = utilities.callMethodChildren(element, 3).attr("style")
                .split("background-image: url(")[1]
                .split(");")[0];

            list.push(item);
        });
        // console.log(list);
    }).catch((error) => console.error(error));
};

run();
