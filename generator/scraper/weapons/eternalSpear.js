const { parseWeapon } = require('../abstractScraper');

const URL = '/Eternal_Spear';

async function parse() {
  return {
    ...(await parseWeapon(URL)),
    name: 'Eternal Spear',
  };
}

module.exports = {
  parse,
};
