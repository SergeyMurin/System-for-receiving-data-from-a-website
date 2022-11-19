const {remote} = require("webdriverio");
const config = require("./config");
const URL = "https://www.g2.com/";

const run = async () => {
    const browser = await remote({
        capabilities: {
            browserName: "chrome",
        }
    })
    await browser.url(URL);
    //await openFirstUrlWithGoogle(browser, URL);
    console.log();

    setTimeout(async () => {
        await search("car", browser);
    }, 5000)

    /*
        const categories = await browser
            .$(config.selectors.search_field.categories_selector);

        await categories.waitForDisplayed();
        let text = await categories.getText();*/


    /*setTimeout(() => {
        browser.deleteSession();
    }, 80000);*/
};


const search = async (query, browser) => {
    await setSearch(browser, config.selectors.search_field.input_selector, query);
    await wait(browser, config.selectors.search_field.popup_selector);
    await getSearchResult(browser, config.selectors.search_field.popup_selector);
}

const setSearch = async (browser, selector, query) => {
    const searchFieldElement = await browser.$(selector);
    await searchFieldElement.click();
    await searchFieldElement.setValue(query);
}

const wait = async (browser, selector) => {
    const element = await browser.$(selector);
    await element.waitForDisplayed({timeout: 10000});
    return element;
}

const getSearchResult = async (browser, selector) => {
    await getSearchResultSections(browser, config.selectors.search_field.section_selector);
    setTimeout(async () => {
        await cookiesHandler(browser);
    }, 8000)

}

const getSearchResultSections = async (browser, selector) => {
    const resultSections = [];
    const elements = await browser.$$(selector);
    const sectionHeaderElements = [];

    for (let element of elements) {
        const sectionHeaderElement = await element.$(config.selectors.search_field.section_header_selector);
        await sectionHeaderElement.scrollIntoView();
        const sectionListElements = await element.$$(config.selectors.search_field.section_list_selector);
        await sectionListElements[1].click();
        break;
    }
}

const openFirstUrlWithGoogle = async (browser, query) => {
    await browser.url("google.com");
    const input = await wait(browser, "input");
    await input.setValue("g2 crowd");
    const button = await wait(browser, ".gNO89b");
    await button.click();
    const searchOutput = await wait(browser, "#search");
    await searchOutput.$("a").click();
};

const cookiesHandler = async (browser) => {
    const allCookies = await browser.getCookies();
    const cookieNames = await allCookies.map((cookie) => {
        return cookie.name;
    });
    await browser.deleteCookies(cookieNames);

}


run();
