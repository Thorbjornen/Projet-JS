const R = require('ramda')

function buildModel(text, order = 2) {
    const model = {}

    for (let i = 0; i <= text.length - order; i++) {
        const prefix = text.slice(i, i + order)
        const next = text[i + order]

        if (!next) continue

        model[prefix] = model[prefix] || {}
        model[prefix][next] = (model[prefix][next] || 0) + 1
    }

    return model
}

function predictNext(model, context) {
    const order = Object.keys(model)[0]?.length || 1
    const key = context.slice(-order)
    const possibilities = model[key]

    if (!possibilities) return []

    return R.pipe(
        R.toPairs,
        R.sortBy(([_, count]) => -count),
        R.map(R.head)
    )(possibilities)
}

module.exports = { buildModel, predictNext }
