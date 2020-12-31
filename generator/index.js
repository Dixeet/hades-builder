const fs = require('fs').promises;
const camelCase = require('lodash/camelCase');
const scraper = require('./scraper');

const extractFolderPath = '../data';
const extractGodsPath = `${extractFolderPath}/gods/`;
const extractWeaponsPath = `${extractFolderPath}/weapons/`;

function serialize({ talents = [], gods = [], weapons = [] }) {
  const promises = [
    fs.writeFile('../data/talents.json', JSON.stringify(talents)),
    ...gods.map((god) => fs.writeFile(`${extractGodsPath}${camelCase(god.name)}.json`, JSON.stringify(god))),
    ...weapons.map((weapon) =>
      fs.writeFile(`${extractWeaponsPath}${camelCase(weapon.name)}.json`, JSON.stringify(weapon)),
    ),
  ];
  return Promise.all(promises);
}

(async function main() {
  const talents = await scraper.scrapTalents();
  const gods = await scraper.scrapGods();
  const weapons = await scraper.scrapWeapons();
  const serObj = {
    talents,
    gods,
    weapons,
  };
  await serialize(serObj);
})();
