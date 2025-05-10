const fs = require('fs');
const path = require('path');
const { buildModel } = require('./markov');

const corpus = fs.readFileSync(path.join(__dirname, '../data/corpus.txt'), 'utf-8').toLowerCase();
const model = buildModel(corpus);

fs.writeFileSync('./model.json', JSON.stringify(model, null, 2));
console.log('✅ Modèle Markov entraîné et sauvegardé.');
