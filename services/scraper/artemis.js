/* eslint-disable no-param-reassign */
import { parseGod } from './abstractScraper';

const URL = '/Artemis';

async function parse() {
  return {
    ...(await parseGod(URL)),
    name: 'Artemis',
    curse: {
      name: 'marked',
      description: 'For 2.5 Seconds, victim has a higher chance of taking one Critical damage from any attack.',
    },
  };
}

export default {
  parse,
};
