/* eslint-disable no-param-reassign */
const parseGod = require('./abstractGod');

const URL = '/Ares';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Ares',
    curse: {
      name: 'doom',
      description: 'After at least 1 Second, victim takes a burst of damage.',
    },
  };
}

module.exports = {
  parse,
};
