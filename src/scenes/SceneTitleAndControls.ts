import { b_, v_1_1_ } from "@beetpx/beetpx";
import { AudioManager } from "../audio/AudioManager";
import { Gameplay } from "../gameplay/Gameplay";
import { c } from "../globals";
import { Scene } from "./Scene";
import { SceneRoomGameplay } from "./SceneRoomGameplay";

export class SceneTitleAndControls implements Scene {
  private _canProceed: boolean = false;

  init(): void {
    AudioManager.startMusicDamped();
  }

  update(): void {
    if (b_.wasJustPressed("a")) {
      this._canProceed = true;
    }
  }

  postUpdate(): Scene | null {
    if (this._canProceed) {
      AudioManager.makeMusicNotDamped();
      return new SceneRoomGameplay({ gameplay: new Gameplay() });
    }
    return null;
  }

  draw(): void {
    b_.clearCanvas(c.black);
    b_.print("title", v_1_1_, c.green);
    b_.print(
      "make player test dash, attack, movement, menu",
      v_1_1_.add(0, 20),
      c.green,
    );
    b_.print("TODO", v_1_1_.add(0, 40), c.green);
  }
}
