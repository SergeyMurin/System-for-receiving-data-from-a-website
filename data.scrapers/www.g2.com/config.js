module.exports = {
    selectors: {
        productSelector:".product-card__img",
        categorySelector: "#breadcrumbs",
        listSelector: ".product-card",
        companySelectors: {
            nameSelector: ".product-card__product-name",
            logoUrlSelector: ".product-card__img",
            ratingSelectors: {
                votesSelector: "",
                currentRateSelector: "",
                maxRateSelector: "",
            },
        },
        descriptionSelectors: {
            descriptionSelector: ".product-listing__paragraph",
            descriptionTruncateOverflowParam: "truncateRevealerOverflowText",
        },
        usersSelector:".cell.medium-4.d-f",
        industriesSelector: ".cell.medium-4.product-card__overview-section",
        marketSegmentSelector: ".cell"
    }
}