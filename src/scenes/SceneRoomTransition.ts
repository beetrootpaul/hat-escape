import {
  b_,
  BpxEasing,
  BpxRgbColor,
  BpxTimer,
  timer_,
  u_,
  v_,
  v_0_0_,
} from "@beetpx/beetpx";
import { AudioManager } from "../audio/AudioManager";
import { Gameplay } from "../gameplay/Gameplay";
import { Hero } from "../gameplay/Hero";
import { Light } from "../gameplay/Light";
import { c, g } from "../globals";
import { Hud } from "../Hud";
import { MaxReachedRoom } from "../MaxReachedRoom";
import { Scene } from "./Scene";
import { SceneRoomGameplay } from "./SceneRoomGameplay";

export class SceneRoomTransition implements Scene {
  constructor(
    params:
      | { gameplay: Gameplay; success: boolean }
      | { fromTitle: true; hero: Hero; light: Light },
  ) {
    this._params = params;
    // if ("fromTitle" in params) {
    //   this._gameplay = params.gameplay;
    //   this._success = params.success;
    //   this._timerIn = timer_(16);
    //   this._timerMid = timer_(params.success ? 10 : 60);
    //   this._timerOut = timer_(16);
    //   this._bgColor = params.success ? c.redYellow2 : c.redYellow5;
    // } else {
    //   this._gameplay = params.gameplay;
    //   this._success = params.success;
    //   this._timerIn = timer_(16);
    //   this._timerMid = timer_(params.success ? 10 : 60);
    //   this._timerOut = timer_(16);
    //   this._bgColor = params.success ? c.redYellow2 : c.redYellow5;
    // }
    this._timerIn = timer_(16);
    this._timerMid = timer_(
      "fromTitle" in params ? 60 : params.success ? 10 : 60,
    );
    this._timerOut = timer_(16);
    this._bgColor =
      "fromTitle" in params
        ? c.blueGreen2
        : params.success
          ? c.redYellow2
          : c.redYellow5;
  }

  private _params:
    | { gameplay: Gameplay; success: boolean }
    | { fromTitle: true; hero: Hero; light: Light };
  // private readonly _gameplay: Gameplay;
  private readonly _hud: Hud = new Hud();
  // private readonly _success: boolean;
  private readonly _timerIn: BpxTimer;
  private readonly _timerMid: BpxTimer;
  private readonly _timerOut: BpxTimer;
  private readonly _bgColor: BpxRgbColor;

  init(): void {
    if ("fromTitle" in this._params) {
    } else {
      if (!this._params.success) {
        AudioManager.makeMusicDamped();
      }
    }
  }

  update(): void {
    if ("fromTitle" in this._params) {
      this._params.light.update();
    } else {
      this._params.gameplay.light.update();
      for (const mob of this._params.gameplay.mobs) {
        mob.update(this._params.gameplay.room);
      }

      if (this._timerIn.hasJustFinished) {
        if (this._params.success) {
          this._params.gameplay.loadNextRoom();
        } else {
          this._params.gameplay.restart();
        }
      }
    }

    if ("fromTitle" in this._params && this._timerMid.hasJustFinished) {
      this._params = {
        gameplay: new Gameplay(),
        success: true,
      };
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
    if (this._timerMid.hasJustFinished) {
      if ("fromTitle" in this._params || !this._params.success) {
        AudioManager.makeMusicNotDamped();
      }
    }
    if (this._timerOut.hasFinished) {
      return new SceneRoomGameplay({
        gameplay:
          "fromTitle" in this._params ? new Gameplay() : this._params.gameplay,
      });
    }
    return null;
  }

  draw(): void {
    b_.clearCanvas("fromTitle" in this._params ? c.blueGreen4 : c.blueGreen5);

    if (!this._timerIn.hasFinished && "fromTitle" in this._params) {
      b_.setCameraXy(v_(0, -16));
    }

    if ("fromTitle" in this._params) {
      this._params.hero.draw();
      this._params.light.draw();
      u_.printWithOutline("Hat Escape", v_(8, -12), c.redYellow3, c.blueGreen5);
    } else {
      this._params.gameplay.room.draw();
      for (const mobSpawner of this._params.gameplay.mobSpawners) {
        mobSpawner.draw();
      }
      this._params.gameplay.hero.draw();
      for (const mob of this._params.gameplay.mobs) {
        mob.draw();
      }
      this._params.gameplay.light.draw();

      this._hud.draw(
        this._params.gameplay.roomNumber,
        MaxReachedRoom.maxReached,
      );
    }

    if (!this._timerIn.hasFinished) {
      const transitionX = u_.lerp(
        g.vs.x,
        0,
        BpxEasing.inQuartic(this._timerIn.progress),
      );
      b_.rectFilled(v_(transitionX, -16), g.vs.add(0, 16), this._bgColor);
    } else if (!this._timerMid.hasFinished) {
      b_.rectFilled(v_0_0_, g.vs, this._bgColor);
      if ("fromTitle" in this._params) {
        u_.printWithOutline(
          "get ready",
          g.vs.div(2).sub(0, 4),
          c.redYellow3,
          c.redYellow1,
          {
            centerXy: [true, true],
          },
        );
      } else if (!this._params.success) {
        u_.printWithOutline(
          "death",
          g.vs.div(2).sub(0, 4),
          c.blueGreen3,
          c.blueGreen5,
          {
            centerXy: [true, true],
          },
        );
      }
    } else if (!this._timerOut.hasFinished) {
      const transitionX = u_.lerp(
        g.vs.x,
        0,
        BpxEasing.outQuartic(this._timerOut.progress),
      );
      b_.rectFilled(v_0_0_, v_(transitionX, g.vs.y), this._bgColor);
    }

    b_.setCameraXy(v_0_0_);
  }
}
