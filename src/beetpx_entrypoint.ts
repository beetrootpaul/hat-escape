import { b_, BpxRgbColor } from "@beetpx/beetpx";
import { Game } from "./Game";
import { g } from "./globals";
import { MagicBookFont } from "./MagicBookFont";

const magicBookFont = new MagicBookFont();
export const tmp = { magicBookFont };

b_.init(
  {
    gameCanvasSize: "128x128",
    desiredUpdateFps: 60,
    debugFeatures: !BEETPX__IS_PROD,
  },
  {
    images: [{ url: g.images.font }],
    fonts: [
      {
        font: magicBookFont,
        spriteTextColor: BpxRgbColor.fromCssHex("#ffffff"),
      },
    ],
    sounds: [],
    jsons: [{ url: g.jsons.font }],
  },
).then(async ({ startGame }) => {
  // TODO: on start / restart

  const game = new Game();
  b_.setOnStarted(() => {
    magicBookFont.setMetrics(b_.getJsonAsset(g.jsons.font));
    b_.setFont(g.fonts.magicBook);
  });
  b_.setOnUpdate(() => game.update());
  b_.setOnDraw(() => game.draw());

  await startGame();
});

// TODO: --htmlIcon
