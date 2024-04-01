import { b_ } from "@beetpx/beetpx";
import { MagicBookFont } from "./MagicBookFont";
import { MaxReachedRoom } from "./MaxReachedRoom";
import { RoomBlueprints } from "./RoomBlueprints";
import { AudioManager } from "./audio/AudioManager";
import { g } from "./globals";
import { PauseMenu } from "./pause/PauseMenu";
import { Scene } from "./scenes/Scene";
import { SceneTitleAndControls } from "./scenes/SceneTitleAndControls";

let pauseMenu: PauseMenu | null = null;

let currentScene: Scene | null = null;
let nextScene: Scene | null = null;

b_.init({
  config: {
    gameCanvasSize: "128x128",
    fixedTimestep: "60fps",
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
  },

  onStarted() {
    // font
    const fontMetrics = b_.getJsonAsset(g.jsons.font).json;
    const magicBookFont: MagicBookFont = new MagicBookFont(fontMetrics);
    b_.useFont(magicBookFont);

    // audio
    AudioManager.restart();

    // pause
    pauseMenu = new PauseMenu();

    // rooms
    RoomBlueprints.loadFromLdtkJson(b_.getJsonAsset(g.jsons.roomsLdtk).json);
    MaxReachedRoom.loadFromStorage();

    // scene
    currentScene = new SceneTitleAndControls();
    currentScene.init();
  },

  onUpdate() {
    if (!pauseMenu?.isActive) {
      nextScene = currentScene?.postUpdate() ?? null;
      if (nextScene) {
        currentScene = nextScene;
        currentScene.init();
      }
      currentScene?.resumeAnimationsAndTimers();
      currentScene?.update();
    } else {
      currentScene?.pauseAnimationsAndTimers();
    }
    pauseMenu?.update();
  },

  onDraw() {
    currentScene?.draw();
    pauseMenu?.draw();
  },
});
