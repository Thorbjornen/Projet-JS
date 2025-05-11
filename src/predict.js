const fs = require('fs')
const readline = require('readline')
const { predictNext } = require('./markov')

const model = JSON.parse(fs.readFileSync('./model/markov.json', 'utf8'))
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let context = ''

console.log('🧠 Tape une lettre, je te proposerai la suite probables (Ctrl+C pour quitter)')

function ask() {
    rl.question(`Lettre suivante (mot en cours : "${context || '[vide]'}) > `, input => {
        const char = input.toLowerCase().trim()

        if (!char || char.length !== 1 || !char.match(/[a-zàâçéèêëîïôûùüÿñæœ]/i)) {
            console.log('❌ Merci de saisir UNE seule lettre valide.')
            return ask()
        }

        context += char
        const suggestions = predictNext(model, context)

        if (!suggestions || suggestions.length === 0) {
            console.log(`🚫 Plus aucune suggestion possible après "${context}". Mot terminé.`)
            context = ''
            return ask()
        }

        console.log(`📌 Lettres probables après "${context}":`, suggestions.slice(0, 5).join(', '))
        ask()
    })
}

ask()
