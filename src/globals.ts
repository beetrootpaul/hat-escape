import {
  BpxCanvasSnapshotColorMapping,
  BpxRgbColor,
  rgb_,
  v_,
} from "@beetpx/beetpx";

export const g = {
  fps: 60,
  // viewport size
  vs: v_(128),
  // tile size
  ts: v_(8),

  images: {
    font: "ChevyRay_MagicBook_atlas.png",
    attack: "attack.png",
    hero: "hero.png",
    light: "light.png",
    tiles: "tiles.png",
    controls: "controls.png",
  },
  jsons: {
    font: "ChevyRay_MagicBook_metrics.json",
    roomsLdtk: "rooms.json",
  },
  fonts: {
    magicBook: "magicBook",
  },
  music: {
    drums1Damped: "drums_1_damped.flac",
    bass1Damped: "bass_1_damped.flac",
    melody1Damped: "melody_1_damped.flac",
    melody2Damped: "melody_2_damped.flac",
    drums1: "drums_1.flac",
    bass1: "bass_1.flac",
    melody1: "melody_1.flac",
    melody2: "melody_2.flac",
  },
};

export const c = {
  // Palette: Rebirth, created by VII
  //   - https://lospec.com/palette-list/rebirth
  //   - https://lospec.com/ventiique
  blueGreen5: rgb_("#0d0812"),
  blueGreen4: rgb_("#162c54"),
  blueGreen3: rgb_("#1c4c62"),
  blueGreen2: rgb_("#3b6166"),
  blueGreen1: rgb_("#46857b"),
  redYellow5: rgb_("#8f154f"),
  redYellow4: rgb_("#b82d46"),
  redYellow3: rgb_("#df803e"),
  redYellow2: rgb_("#e2a560"),
  redYellow1: rgb_("#edce5e"),
};

export const cm = {
  snapshotDarker: BpxCanvasSnapshotColorMapping.of(
    (canvasColor: BpxRgbColor | null): BpxRgbColor | null => {
      if (!canvasColor) return canvasColor;
      return rgb_(canvasColor.r / 2, canvasColor.g / 2, canvasColor.b / 2);
    },
  ),
};
