const { parseWeapon } = require('../abstractScraper');

const URL = '/Adamant_Rail';

async function parse() {
  return {
    ...(await parseWeapon(URL)),
    name: 'Adamant Rail',
  };
}

module.exports = {
  parse,
};
