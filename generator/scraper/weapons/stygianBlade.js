const { parseWeapon } = require('../abstractScraper');

const URL = '/Stygian_Blade';

async function parse() {
  return {
    ...(await parseWeapon(URL)),
    name: 'Stygian Blade',
  };
}

module.exports = {
  parse,
};
