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
    callMethodChildren: (node, number = selectors.length, selectors) => {

        let element = $(node);
        switch (!!selectors) {
            case true: {
                for (const selector of selectors) {
                    element = element.children(selector);
                }
                break;
            }
            case false: {
                for (let i = 0; i < number; i++) {
                    element = element.children();
                }
                break;
            }
        }
        return element;
    }
}