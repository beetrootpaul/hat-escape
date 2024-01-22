import { b_, BpxRgbColor } from "@beetpx/beetpx";
import { AudioManager } from "./audio/AudioManager";
import { g } from "./globals";
import { MagicBookFont } from "./MagicBookFont";
import { MaxReachedRoom } from "./MaxReachedRoom";
import { PauseMenu } from "./pause/PauseMenu";
import { RoomBlueprints } from "./RoomBlueprints";
import { Scene } from "./scenes/Scene";
import { SceneBrp } from "./scenes/SceneBrp";

const magicBookFont: MagicBookFont = new MagicBookFont();

let pauseMenu: PauseMenu | null = null;

let currentScene: Scene | null = null;
let nextScene: Scene | null = null;

b_.init(
  {
    gameCanvasSize: "128x128",
    desiredUpdateFps: 60,
    debugFeatures: !BEETPX__IS_PROD,
  },
  {
    images: [
      { url: g.images.font },
      { url: g.images.attack },
      { url: g.images.hero },
      { url: g.images.light },
      { url: g.images.tiles },
      { url: g.images.controls },
    ],
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
    jsons: [{ url: g.jsons.font }, { url: g.jsons.roomsLdtk }],
  },
).then(async ({ startGame }) => {
  b_.setOnStarted(() => {
    // font
    magicBookFont.setMetrics(b_.getJsonAsset(g.jsons.font));
    b_.setFont(g.fonts.magicBook);

    // input
    b_.setRepeating("left", false);
    b_.setRepeating("right", false);
    b_.setRepeating("up", false);
    b_.setRepeating("down", false);
    b_.setRepeating("a", false);
    b_.setRepeating("b", false);
    b_.setRepeating("menu", false);

    // audio
    AudioManager.restart();

    // pause
    pauseMenu = new PauseMenu();

    // rooms
    RoomBlueprints.loadFromLdtkJson(b_.getJsonAsset(g.jsons.roomsLdtk).json);
    MaxReachedRoom.loadFromStorage();

    // scene
    currentScene = new SceneBrp();
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
