const CHEERIO = require("cheerio");
const $ = CHEERIO.load("");

exports.utilities = {
    callMethodNext: (node, number) => {
        let element = $(node);
        for (let i = 0; i < number; i++) {
            element = element.next();
        }
        return element;
    },
    callMethodChildren: (node, number) => {
        let element = $(node);
        for (let i = 0; i < number; i++) {
            element = element.children();
        }
        return element;
    }
}