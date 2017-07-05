const fs = require('fs-extra');

const source = 'data/sprites/pokemon';
const destination = 'assets/images/sprites/pokemon/battle';
fs.readdirSync(source)
  .filter(file => file.endsWith('.gif'))
  .forEach(file => {
    const [number, side] = file.split('-');
    const pokemonDestination = `${destination}/${number}`;
    fs.copySync(`${source}/${file}`, `${pokemonDestination}/${side}`);
  });
