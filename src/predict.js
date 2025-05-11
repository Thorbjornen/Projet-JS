const fs = require('fs');
const readline = require('readline');
const { predictNext } = require('./markov');

const model = JSON.parse(fs.readFileSync('./model/markov.json', 'utf8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let context = '';
console.log('Tapez une lettre :');

function ask() {
  rl.question(`Lettre suivante (mot en cours : "${context || '[vide]'}) > `, (input) => {
    const char = input.toLowerCase().trim();

    if (!char || char.length !== 1 || !char.match(/[a-zàâçéèêëîïôûùüÿñæœ]/i)) {
      console.log('Saisir une lettre valide.');
      return ask();
    }

    context += char;

    const suggestions = predictNext(model, context);

    if (!suggestions || suggestions.length === 0) {
      console.log(`Aucune suite possible pour "${context}".\nNouveau mot:`);
      context = '';
      return ask();
    }

    console.log(`Lettres probables après "${context}":`);
    const total = suggestions.reduce((sum, [, count]) => sum + Number(count), 0);

    suggestions.forEach(([letter, count]) => {
      const percentage = (Number(count) / total) * 100;
      console.log(`  ${letter} : ${percentage.toFixed(2)}%`);
    });

    ask();
  });
}

ask();
