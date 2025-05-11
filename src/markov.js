const R = require('ramda');

function predictNext(model, context) {
  const nextLetters = model[context.toLowerCase()];
  if (!nextLetters) {
    return [];
  }

  return R.pipe(
      R.toPairs,                 // [ [lettre, fréquence], ... ]
      R.sortBy(R.head)           // trie alphabétiquement par lettre
  )(nextLetters);
}

module.exports = { predictNext };
