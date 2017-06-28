const fs = require('fs');

let output = 'export default Sprites = {';

const spriteDirectory = 'assets/images/sprites';
addDirectoryToOutput(spriteDirectory);

function addDirectoryToOutput(directory) {
  let files = fs.readdirSync(directory);
  let containsSprites = files.every((file) => {
    let fullPath = directory + '/' + file;
    let isDirectory = fs.statSync(fullPath).isDirectory();
    return !isDirectory;
  });

  let directoryName = directory.match(/\/([^/]+)$/)[1];
  if (containsSprites) {
    let sprites = {};
    files.forEach((file) => {
      let matches = file.match(/([nesw])(\d+)/);
      let direction = matches[1];
      let number = matches[2];

      sprites[direction] = sprites[direction] || {};
      sprites[direction][number] = `require('../../../${directory}/${file}')`;
    });

    let spriteObj = JSON.stringify(sprites);
    spriteObj = spriteObj.replace(/"require\(/g, 'require(');
    spriteObj = spriteObj.replace(/\)"/g, ')');
    output = output + `"${directoryName}": ${spriteObj},`;
  } else {
    output = output + `"${directoryName}": {`;
    files.forEach((childDirectory) => {
      addDirectoryToOutput(directory + '/' + childDirectory);
    });
    output = output + '},';
  }
}

output = output + '};';

fs.writeFileSync('source/components/sprites/sprites.js', output);
