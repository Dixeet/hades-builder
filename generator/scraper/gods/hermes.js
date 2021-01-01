/* eslint-disable no-param-reassign */
const parseGod = require('./abstractGod');

const URL = '/Hermes';

async function parse() {
  return {
    ...(await parseGod(URL, false)),
    name: 'Hermes',
  };
}

module.exports = {
  parse,
};
