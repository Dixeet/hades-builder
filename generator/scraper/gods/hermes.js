/* eslint-disable no-param-reassign */
const { parseGod } = require('../abstractScraper');

const URL = '/Hermes';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Hermes',
  };
}

module.exports = {
  parse,
};
