/* eslint-disable no-param-reassign */
const parseGod = require('./abstractGod');

const URL = '/Chaos';

async function parse() {
  return {
    ...(await parseGod(URL, false)),
    name: 'Chaos',
  };
}

module.exports = {
  parse,
};
