import aphrodite from '~/data/gods/aphrodite';
import ares from '~/data/gods/ares';
import artemis from '~/data/gods/artemis';
import athena from '~/data/gods/athena';
import chaos from '~/data/gods/chaos';
import demeter from '~/data/gods/demeter';
import dionysus from '~/data/gods/dionysus';
import hermes from '~/data/gods/hermes';
import poseidon from '~/data/gods/poseidon';
import zeus from '~/data/gods/zeus';
import adamantRail from '~/data/weapons/adamantRail';
import eternalSpear from '~/data/weapons/eternalSpear';
import hearSeekingBow from '~/data/weapons/hearSeekingBow';
import shieldOfChaos from '~/data/weapons/shieldOfChaos';
import stygianBlade from '~/data/weapons/stygianBlade';
import twinFists from '~/data/weapons/twinFists';
import talents from '~/data/talents';

export default function fn(ctx, inject) {
  const data = {
    gods: [aphrodite, ares, artemis, athena, chaos, demeter, dionysus, hermes, poseidon, zeus],
    weapons: [adamantRail, eternalSpear, hearSeekingBow, shieldOfChaos, stygianBlade, twinFists],
    talents,
  };
  inject('data', data);
}
