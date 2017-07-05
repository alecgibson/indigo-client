const exec = require('child_process').exec;
const fs = require('fs');

const directory = 'data/sprites/pokemon';
fs.readdirSync(directory)
  .filter(file => file.endsWith('.png'))
  .forEach(file => {
    exec(`./${directory}/apng2gif ${directory}/${file}`);
  });
