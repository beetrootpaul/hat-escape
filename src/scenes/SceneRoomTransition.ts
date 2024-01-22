import {
  b_,
  BpxEasing,
  BpxTimer,
  timer_,
  u_,
  v_,
  v_0_0_,
  v_1_1_,
} from "@beetpx/beetpx";
import { AudioManager } from "../audio/AudioManager";
import { Gameplay } from "../gameplay/Gameplay";
import { c, g } from "../globals";
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
    for (const mob of this._gameplay.mobs) {
      mob.update(this._gameplay.room);
    }

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
    b_.clearCanvas(c.blueGreen5);
    if (!this._timerIn.hasFinished) {
      b_.print("transition IN", v_1_1_, c.redYellow1);
      b_.print(
        `(room=${this._gameplay.roomNumber})`,
        v_1_1_.add(0, 20),
        c.redYellow1,
      );
      b_.print("TODO", v_1_1_.add(0, 40), c.redYellow1);
    } else if (!this._timerMid.hasFinished) {
      b_.print("transition MID", v_1_1_, c.redYellow5);
      b_.print(
        `(room=${this._gameplay.roomNumber})`,
        v_1_1_.add(0, 20),
        c.redYellow5,
      );
      b_.print("TODO", v_1_1_.add(0, 40), c.redYellow5);
    } else if (!this._timerOut.hasFinished) {
      b_.print("transition OUT", v_1_1_, c.blueGreen4);
      b_.print(
        `(room=${this._gameplay.roomNumber})`,
        v_1_1_.add(0, 20),
        c.blueGreen4,
      );
      b_.print("TODO", v_1_1_.add(0, 40), c.blueGreen4);
    }

    this._gameplay.room.draw();
    for (const mobSpawner of this._gameplay.mobSpawners) {
      mobSpawner.draw();
    }
    this._gameplay.hero.draw();
    for (const mob of this._gameplay.mobs) {
      mob.draw();
    }
    this._gameplay.light.draw();

    if (!this._timerIn.hasFinished) {
      const transitionX = u_.lerp(
        g.vs.x,
        0,
        BpxEasing.inQuartic(this._timerIn.progress),
      );
      b_.rectFilled(v_(transitionX, 0), g.vs, c.blueGreen5);
    } else if (!this._timerMid.hasFinished) {
      b_.clearCanvas(c.blueGreen5);
    } else if (!this._timerOut.hasFinished) {
      const transitionX = u_.lerp(
        g.vs.x,
        0,
        BpxEasing.outQuartic(this._timerOut.progress),
      );
      b_.rectFilled(v_0_0_, v_(transitionX, g.vs.y), c.blueGreen5);
    }
  }
}
