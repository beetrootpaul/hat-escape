import {
  BpxCanvasSnapshotColorMapping,
  BpxRgbColor,
  rgb_,
  v_,
} from "@beetpx/beetpx";

export const g = {
  fps: 60,
  // viewport size
  vs: v_(128, 128),
  // tile size
  ts: v_(8, 8),

  images: {
    font: "ChevyRay_MagicBook_atlas.png",
    attack: "attack.png",
    hero: "hero.png",
    light: "light.png",
    tiles: "tiles.png",
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
  blueGreen5: BpxRgbColor.fromCssHex("#0d0812"),
  blueGreen4: BpxRgbColor.fromCssHex("#162c54"),
  blueGreen3: BpxRgbColor.fromCssHex("#1c4c62"),
  blueGreen2: BpxRgbColor.fromCssHex("#3b6166"),
  blueGreen1: BpxRgbColor.fromCssHex("#46857b"),
  redYellow5: BpxRgbColor.fromCssHex("#8f154f"),
  redYellow4: BpxRgbColor.fromCssHex("#b82d46"),
  redYellow3: BpxRgbColor.fromCssHex("#df803e"),
  redYellow2: BpxRgbColor.fromCssHex("#e2a560"),
  redYellow1: BpxRgbColor.fromCssHex("#edce5e"),
};

export const cm = {
  snapshotDarker: BpxCanvasSnapshotColorMapping.of(
    (canvasColor: BpxRgbColor | null): BpxRgbColor | null => {
      if (!canvasColor) return canvasColor;
      return rgb_(canvasColor.r / 2, canvasColor.g / 2, canvasColor.b / 2);
    },
  ),
};
