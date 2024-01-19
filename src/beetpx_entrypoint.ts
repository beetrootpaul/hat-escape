import { b_, rgb_, v_ } from "@beetpx/beetpx";

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
  b_.setOnDraw(() => {
    b_.rectFilled(v_(10, 20), v_(30, 40), rgb_(120, 120, 50));
  });

  await startGame();
});

// TODO: --htmlIcon
