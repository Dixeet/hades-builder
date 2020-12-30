/* eslint-disable no-param-reassign */
import { parseGod } from './abstractScraper';

const URL = '/Aphrodite';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Aphrodite',
    curse: {
      name: 'weak',
      description: 'For at least 3 Seconds, victim deals at least 30% less damage.',
    },
  };
}

export default {
  parse,
};
