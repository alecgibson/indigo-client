const Jimp = require('jimp');

Jimp.read('data/sprites/black-white-pokemon-overworld.png', process);

function process(error, sprites) {
  for (let pokemonHeightIndex = 0; pokemonHeightIndex < 10; pokemonHeightIndex++) {
    for (let pokemonWidthIndex = 0; pokemonWidthIndex < 16; pokemonWidthIndex++) {
      for (let i=0; i < 2; i++){
        for (let j=0; j < 3; j++) {
          let direction;
          switch (j) {
            case 0:
              direction = 'n';
              break;
            case 1:
              direction = 's';
              break;
            case 2:
              direction = 'w';
          }

          let sprite = sprites.clone();

          let x = pokemonWidthIndex * 32 * 2 + i * 32;
          let y = pokemonHeightIndex * 32 * 4 + j * 32;

          let pokemonNumber = pokemonHeightIndex * 16 + pokemonWidthIndex + 1;

          let gender = '';
          if (pokemonNumber === 3) {
            gender = 'm'
          }
          if (pokemonNumber === 4) {
            gender = 'f';
          }

          if (pokemonNumber > 3) {
            pokemonNumber--;
          }

          if (pokemonNumber === 25) {
            gender = 'm'
          }
          if (pokemonNumber === 26) {
            gender = 'f';
          }

          if (pokemonNumber > 25) {
            pokemonNumber--;
          }

          pokemonNumber = ('000' + pokemonNumber).slice(-3);
          console.log("Pokemon " + pokemonNumber);

          sprite.crop(x, y, 32, 32);
          addTransparency(sprite);

          let folder = `assets/images/sprites/pokemon/overworld/${pokemonNumber}${gender}`;
          sprite.write(`${folder}/${direction}${i}.png`);

          if (j===2) {
            sprite.mirror(true, false)
              .write(`${folder}/e${i}.png`);
          }
        }
      }
    }
  }
}

function addTransparency(sprite) {
  let backgroundColour = sprite.getPixelColor(0, 0);
  sprite.scan(0, 0, sprite.bitmap.width, sprite.bitmap.height, function(x, y, i) {
    let red = this.bitmap.data[i];
    let green = this.bitmap.data[i + 1];
    let blue = this.bitmap.data[i + 2];
    let alpha = this.bitmap.data[i + 3];
    let pixelColour = Jimp.rgbaToInt(red, green, blue, alpha);
    if (pixelColour === backgroundColour) {
      this.bitmap.data[i+3] = 0;
    }
  });
}
