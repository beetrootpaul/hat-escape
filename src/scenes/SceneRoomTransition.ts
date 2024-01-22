import { b_, BpxTimer, timer_, v_1_1_ } from "@beetpx/beetpx";
import { AudioManager } from "../audio/AudioManager";
import { Gameplay } from "../gameplay/Gameplay";
import { c } from "../globals";
import { Scene } from "./Scene";
import { SceneRoomGameplay } from "./SceneRoomGameplay";

export class SceneRoomTransition implements Scene {
  constructor(params: { gameplay: Gameplay; success: boolean }) {
    this._gameplay = params.gameplay;
    this._success = params.success;
    this._timerIn = timer_(30);
    this._timerMid = timer_(params.success ? 10 : 60);
    this._timerOut = timer_(30);
  }

  private readonly _gameplay: Gameplay;
  private readonly _success: boolean;
  private readonly _timerIn: BpxTimer;
  private readonly _timerMid: BpxTimer;
  private readonly _timerOut: BpxTimer;

  init(): void {
    if (!this._success) {
      AudioManager.makeMusicDamped();
    }
  }

  update(): void {
    this._gameplay.light.update();

    if (this._timerIn.hasJustFinished) {
      if (this._success) {
        this._gameplay.loadNextRoom();
      } else {
        this._gameplay.restart();
      }
    }

    if (this._timerMid.hasFinished) {
      this._timerOut.update();
    }
    if (this._timerIn.hasFinished) {
      this._timerMid.update();
    }
    this._timerIn.update();
  }

  postUpdate(): Scene | null {
    if (this._timerOut.hasFinished) {
      if (!this._success) {
        AudioManager.makeMusicNotDamped();
      }
      return new SceneRoomGameplay({ gameplay: this._gameplay });
    }
    return null;
  }

  draw(): void {
    b_.clearCanvas(c.black);
    if (!this._timerIn.hasFinished) {
      b_.print("transition IN", v_1_1_, c.white);
      b_.print(
        `(room=${this._gameplay.roomNumber})`,
        v_1_1_.add(0, 20),
        c.white,
      );
      b_.print("TODO", v_1_1_.add(0, 40), c.white);
    } else if (!this._timerMid.hasFinished) {
      b_.print("transition MID", v_1_1_, c.red);
      b_.print(`(room=${this._gameplay.roomNumber})`, v_1_1_.add(0, 20), c.red);
      b_.print("TODO", v_1_1_.add(0, 40), c.red);
    } else if (!this._timerOut.hasFinished) {
      b_.print("transition OUT", v_1_1_, c.blue);
      b_.print(
        `(room=${this._gameplay.roomNumber})`,
        v_1_1_.add(0, 20),
        c.blue,
      );
      b_.print("TODO", v_1_1_.add(0, 40), c.blue);
    }

    this._gameplay.room.draw();
    this._gameplay.hero.draw();
    this._gameplay.light.draw();
  }
}
