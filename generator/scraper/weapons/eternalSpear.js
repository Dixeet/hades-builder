const parseWeapon = require('./abstractWeapon');

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
