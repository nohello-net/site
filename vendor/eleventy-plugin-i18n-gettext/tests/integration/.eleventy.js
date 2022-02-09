'use strict'

const i18n = require('./i18n-wrapper')

module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(i18n)

    eleventyConfig.addPassthroughCopy("src/img")

    eleventyConfig.addShortcode("fruit_card", (fruit, locale) => {
        let html = '<div class="card"><div class="card-body">'

        html += `<h4 class="card-title">${i18n._(locale, fruit.name)} <span class="badge badge-primary">${i18n._(locale, fruit.variety)}</span></h4>`
        html += `<div class="card-text">${i18n._n(locale, 'This fruit is excellent.', 'These fruits are excellent.', fruit.count)}</div>`

        return html + '</div></div>'
    })

    return {
        dir: {
            output: "dist",
            input: "src"
        }
    }
}