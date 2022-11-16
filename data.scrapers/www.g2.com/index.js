const fs = require("fs");
const cheerio = require("cheerio");
const config = require("./config");

const productListItem = {
    product_id: undefined,
    product_uuid: undefined,
    product_title: undefined,
    product_description: undefined,
    vendor_id: undefined,
    product_type: undefined,
    category_id: undefined,
    category: undefined,
    industries: undefined,
    marketSegment: undefined
};

const getDataFromFile = (fileName) => {
    return fs.readFileSync(fileName, "ascii");
};

const clearString = (string) => {
    if (!string) {
        return null;
    }

    let str = string.replace(/\s\s+/g, ' ');
    str = str.replace(/\n/g, "")
    return str
};

const getProduct = (data, list) => {
    const $ = cheerio.load(data);

    $(config.selectors.productSelector).each((i, el) => {
        const listItem = Object.assign({}, productListItem);
        let elementData = $(el).data();
        elementData = elementData["eventOptions"];

        listItem.product_id = elementData["product_id"];
        listItem.product_uuid = elementData["product_uuid"];
        listItem.product_title = elementData["product"];
        listItem.product_type = elementData["product_type"];
        listItem.category_id = elementData["category_id"];
        listItem.category = elementData["category"];
        listItem.vendor_id = elementData["vendor_id"];

        list.push(listItem);
    })
};

const getProductDescription = (data, list) => {
    const $ = cheerio.load(data);

    $(config.selectors.listSelector).each((i, el) => {

        let firstPartOfTheDescription = $(el)
            ?.find(config.selectors.descriptionSelectors.descriptionSelector).html();
        firstPartOfTheDescription = clearString(firstPartOfTheDescription);
        let secondPartOfTheDescription = $(el)
            ?.find(config.selectors.descriptionSelectors.descriptionSelector)
            ?.data()?.[config.selectors.descriptionSelectors.descriptionTruncateOverflowParam];
        secondPartOfTheDescription = clearString(secondPartOfTheDescription);

        let usersStr = $(el).find(config.selectors.usersSelector).last().text();
        usersStr = clearString(usersStr);
        const users = listSplitter(usersStr, "Users");

        let industriesStr = $(el).find(config.selectors.industriesSelector).first().text();
        industriesStr = clearString(industriesStr);
        const industries = listSplitter(industriesStr, "Industries");

        let marketSegmentStr = $(el).find(config.selectors.industriesSelector).last().text();
        marketSegmentStr = clearString(marketSegmentStr);
        const marketSegment = listSplitter(marketSegmentStr, "Market Segment");

        let description = "";
        if (firstPartOfTheDescription === null || secondPartOfTheDescription === null) {
            description = null;
        } else description = firstPartOfTheDescription + secondPartOfTheDescription;

        list[i].product_description = description;
        list[i].industries = industries;
        list[i].marketSegment = marketSegment;

    });
};

const listSplitter = (str, separator) => {
    const content = str.split(separator)[1]?.trim()?.split(" ");
    if (!content || content[0].toLocaleLowerCase() === "no") {
        return null;
    }

    return content;
}


const dataParse = (data) => {
    const productList = [];
    getProduct(data, productList);
    getProductDescription(data, productList);
    console.log(productList);
}

const run = () => {
    try {
        const name1 = "page.html";
        const name2 = "page2.html"
        const data = getDataFromFile(name1);
        dataParse(data);
    } catch (error) {
        console.error(error)
    }
};

run();

