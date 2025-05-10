const assert = require('assert');
const { buildModel, predictNext } = require('../src/markov');

const model = buildModel('hello');

assert.deepStrictEqual(predictNext(model, 'h'), ['e']);
assert.deepStrictEqual(predictNext(model, 'e'), ['l']);
assert.deepStrictEqual(predictNext(model, 'l'), ['l', 'o']);
