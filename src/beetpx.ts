import { b_ } from "@beetpx/beetpx";
import { MaxReachedRoom } from "./MaxReachedRoom";
import { RoomBlueprints } from "./RoomBlueprints";
import { g } from "./globals";
import { magicBookFontFrom } from "./magicBookFont";
import { PauseMenu } from "./pause/PauseMenu";
import { Scene } from "./scenes/Scene";
import { SceneTitleAndControls } from "./scenes/SceneTitleAndControls";

let pauseMenu: PauseMenu | null = null;

let currentScene: Scene | null = null;
let nextScene: Scene | null = null;

b_.init({
  canvasSize: "128x128",
  fixedTimestep: "60fps",
  globalPause: {
    available: true,
  },
  assets: [
    // IMAGE files
    g.images.font,
    g.images.attack,
    g.images.hero,
    g.images.light,
    g.images.tiles,
    g.images.controls,
    // MUSIC files
    g.music.drums1Damped,
    g.music.bass1Damped,
    g.music.melody1Damped,
    g.music.melody2Damped,
    g.music.drums1,
    g.music.bass1,
    g.music.melody1,
    g.music.melody2,
    // JSON files
    g.jsons.font,
    g.jsons.roomsLdtk,
  ],
  debugMode: {
    available: !window.BEETPX__IS_PROD,
    fpsDisplay: {
      enabled: true,
    },
  },
  frameByFrame: {
    available: !window.BEETPX__IS_PROD,
  },
}).then(async ({ startGame }) => {
  b_.setOnStarted(() => {
    // font
    const fontMetrics = b_.getJsonAsset(g.jsons.font).json;
    b_.useFont(magicBookFontFrom(fontMetrics));

    // pause
    pauseMenu = new PauseMenu();

    // rooms
    RoomBlueprints.loadFromLdtkJson(b_.getJsonAsset(g.jsons.roomsLdtk).json);
    MaxReachedRoom.loadFromStorage();

    // scene
    currentScene = new SceneTitleAndControls();
    currentScene.init();
  });

  b_.setOnUpdate(() => {
    if (!pauseMenu?.isActive) {
      nextScene = currentScene?.postUpdate() ?? null;
      if (nextScene) {
        currentScene = nextScene;
        currentScene.init();
      }
      currentScene?.update();
    }
    pauseMenu?.update();
  });

  b_.setOnDraw(() => {
    currentScene?.draw();
    pauseMenu?.draw();
  });

  await startGame();
});
