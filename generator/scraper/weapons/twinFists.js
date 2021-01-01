const parseWeapon = require('./abstractWeapon');

const URL = '/Twin_Fists';

async function parse() {
  return {
    ...(await parseWeapon(URL)),
    name: 'Twin Fists',
  };
}

module.exports = {
  parse,
};
