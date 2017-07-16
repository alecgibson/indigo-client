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
    files
      .filter((file) => {
        return !file.startsWith('.');
      })
      .forEach((file) => {
        const overworldMatches = file.match(/([nesw])(\d+)/);
        const battleMatches = file.match(/(front|back)/);

        if (overworldMatches) {
          const direction = overworldMatches[1];
          const number = overworldMatches[2];
          sprites[direction] = sprites[direction] || {};
          sprites[direction][number] = `require('../../../${directory}/${file}')`;
        } else if (battleMatches) {
          const frontOrBack = battleMatches[1];
          sprites[frontOrBack] = `require('../../../${directory}/${file}')`;
        }
      });

    let spriteObj = JSON.stringify(sprites);
    spriteObj = spriteObj.replace(/"require\(/g, 'require(');
    spriteObj = spriteObj.replace(/\)"/g, ')');
    output = output + `"${directoryName}": ${spriteObj},`;
  } else {
    output = output + `"${directoryName}": {`;
    files
      .filter((childDirectory) => {
      return !childDirectory.startsWith('.');
      })
      .forEach((childDirectory) => {
        addDirectoryToOutput(directory + '/' + childDirectory);
      });
    output = output + '},';
  }
}

output = output + '};';

fs.writeFileSync('source/components/sprites/sprites.js', output);
