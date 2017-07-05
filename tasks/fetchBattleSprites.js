const https = require('https');
const fs = require('fs');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

for (let i = 1; i <= 151; i++) {
  const pokemonNumber = ('000' + i).slice(-3);

  const multiGenderPokemon = [
    3,
    12,
    19,
    20,
    25,
    26,
    41,
    42,
    44,
    45,
    64,
    65,
    84,
    85,
    97,
    111,
    112,
    118,
    119,
    123,
    129,
    130,
  ];

  let genders;
  if (multiGenderPokemon.find(number => number === i)) {
    genders = ['m', 'f'];
  } else {
    genders = [''];
  }

  for (let gender of genders) {
    const dir = `data/sprites/pokemon`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const front = fs.createWriteStream(`${dir}/${pokemonNumber}${gender}-front.png`);
    const back = fs.createWriteStream(`${dir}/${pokemonNumber}${gender}-back.png`);
    const genderSuffix = gender ? `_${gender}` : '';

    let url = `https://bulbapedia.bulbagarden.net/wiki/File:Spr_5b_${pokemonNumber}${genderSuffix}.png`;
    https.get(url, (response) => {
      console.log(url);
      response.setEncoding('utf8');
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
          const dom = new JSDOM(body);
          const href = 'https://' + dom.window.document.querySelector('#file a').getAttribute('href').substring(2);
          console.log(href);
          https.get(href, (imageResponse) => {
            imageResponse.pipe(front);
          });
        } catch (e) {
          console.log("ERROR: " + url);
          throw e;
        }
      });
    });

    url = `https://bulbapedia.bulbagarden.net/wiki/File:Spr_b_5b_${pokemonNumber}${genderSuffix}.png`;
    https.get(url, (response) => {
      console.log(url);
      response.setEncoding('utf8');
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
          const dom = new JSDOM(body);
          const href = 'https://' + dom.window.document.querySelector('#file a').getAttribute('href').substring(2);
          console.log(href);
          https.get(href, (imageResponse) => {
            imageResponse.pipe(back);
          });
        } catch (e) {
          console.log("ERROR: " + url);
          throw e;
        }
      });
    });
  }
}
