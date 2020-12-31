/* eslint-disable no-param-reassign */
const { parseGod } = require('../abstractScraper');

const URL = '/Chaos';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Chaos',
  };
}

module.exports = {
  parse,
};
