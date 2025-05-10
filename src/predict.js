const fs = require('fs');
const { predictNext } = require('./markov');

const model = JSON.parse(fs.readFileSync('./model.json', 'utf-8'));

const input = process.argv[2] || 'e';

const suggestions = predictNext(model, input);

console.log(`➡️ À partir de "${input}", lettres probables :`, suggestions.slice(0, 5));
