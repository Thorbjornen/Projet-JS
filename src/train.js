const fs = require('fs')
const path = require('path')
const { buildModel } = require('./markov')

const raw = fs.readFileSync(path.join(__dirname, '../data/dictionnaire.txt'), 'utf8')
const text = raw
    .toLowerCase()
    .replace(/[^a-zàâçéèêëîïôûùüÿñæœ]/gi, '')

const model = buildModel(text, 2)
fs.writeFileSync(path.join(__dirname, '../model/markov.json'), JSON.stringify(model, null, 2))

console.log('✅ Modèle entraîné avec succès.')
