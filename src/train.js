const fs = require('node:fs')
const R = require('ramda')

const raw = fs.readFileSync('./data/corpus.txt', 'utf8')
const words = raw.toLowerCase().match(/\w+/g)

const model = {}

for (const word of words) {
  for (let i = 0; i < word.length - 1; i++) {
    const prefix = word.slice(0, i + 1)
    const nextChar = word[i + 1]

    if (!model[prefix]) {
      model[prefix] = {}
    }

    model[prefix][nextChar] = (model[prefix][nextChar] || 0) + 1
  }
}

fs.writeFileSync('./model/markov.json', JSON.stringify(model, null, 2), 'utf8')
console.log('Modèle de Markov généré avec succès.')
