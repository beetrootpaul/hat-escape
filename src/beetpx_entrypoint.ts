import { b_ } from "@beetpx/beetpx";
import { Game } from "./Game";

b_.init(
  {
    gameCanvasSize: "128x128",
    desiredUpdateFps: 60,
    debugFeatures: !BEETPX__IS_PROD,
  },
  {
    images: [],
    fonts: [],
    sounds: [],
    jsons: [],
  },
).then(async ({ startGame }) => {
  // TODO: on start / restart

  const game = new Game();
  b_.setOnUpdate(() => game.update());
  b_.setOnDraw(() => game.draw());

  await startGame();
});

// TODO: --htmlIcon
