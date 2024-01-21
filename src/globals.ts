import {
  black_,
  blue_,
  BpxCanvasSnapshotColorMapping,
  BpxRgbColor,
  green_,
  red_,
  rgb_,
  v_,
  white_,
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
  black: black_,
  white: white_,
  red: red_,
  green: green_,
  blue: blue_,
};

export const cm = {
  snapshotDarker: BpxCanvasSnapshotColorMapping.of(
    (canvasColor: BpxRgbColor | null): BpxRgbColor | null => {
      if (!canvasColor) return canvasColor;
      return rgb_(canvasColor.r / 2, canvasColor.g / 2, canvasColor.b / 2);
    },
  ),
};
