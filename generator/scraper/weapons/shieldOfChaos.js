const parseWeapon = require('./abstractWeapon');

const URL = '/Shield_of_Chaos';

async function parse() {
  return {
    ...(await parseWeapon(URL)),
    name: 'Shield of Chaos',
  };
}

module.exports = {
  parse,
};
