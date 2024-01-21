import { b_, BpxRgbColor } from "@beetpx/beetpx";
import { Game } from "./Game";
import { g } from "./globals";
import { MagicBookFont } from "./MagicBookFont";
import { PauseScreen } from "./PauseScreen";

const magicBookFont = new MagicBookFont();

const pause = new PauseScreen();

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
    sounds: [
      { url: g.music.drums1Damped },
      { url: g.music.bass1Damped },
      { url: g.music.melody1Damped },
      { url: g.music.melody2Damped },
      { url: g.music.drums1 },
      { url: g.music.bass1 },
      { url: g.music.melody1 },
      { url: g.music.melody2 },
    ],
    jsons: [{ url: g.jsons.font }],
  },
).then(async ({ startGame }) => {
  // TODO: on start / restart

  const game = new Game();
  b_.setOnStarted(() => {
    magicBookFont.setMetrics(b_.getJsonAsset(g.jsons.font));
    b_.setFont(g.fonts.magicBook);
  });
  b_.setOnUpdate(() => {
    if (PauseScreen.isGamePaused) {
      if (b_.wasJustPressed("menu")) {
        PauseScreen.isGamePaused = false;
      }
    } else {
      if (b_.wasJustPressed("menu")) {
        PauseScreen.isGamePaused = true;
      }
    }

    if (PauseScreen.isGamePaused) {
      // do nothing
    } else {
      game.update();
    }
  });
  b_.setOnDraw(() => {
    if (PauseScreen.isGamePaused) {
      pause.draw();
    } else {
      game.draw();
    }
  });

  await startGame();
});

// TODO: --htmlIcon
