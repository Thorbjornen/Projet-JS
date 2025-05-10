const R = require('ramda');

function buildModel(text) {
    const model = {};

    for (let i = 0; i < text.length - 1; i++) {
        const current = text[i];
        const next = text[i + 1];

        if (!model[current]) {
            model[current] = {};
        }

        model[current][next] = (model[current][next] || 0) + 1;
    }

    return model;
}

function predictNext(model, currentChar) {
    const transitions = model[currentChar];
    if (!transitions) return [];

    const sorted = R.pipe(
        R.toPairs,
        R.sortBy(([_, count]) => -count)
    )(transitions);

    return sorted.map(([char]) => char);
}

module.exports = {
    buildModel,
    predictNext
};
