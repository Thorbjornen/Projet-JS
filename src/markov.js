const R = require('ramda');

function predictNext(model, context) {
  const nextLetters = model[context.toLowerCase()];
  if (!nextLetters) {
    return [];
  }

  return R.pipe(
      R.toPairs,
      R.sortBy(R.head)
  )(nextLetters);
}

module.exports = { predictNext };
