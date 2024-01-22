import {
  b_,
  BpxEasing,
  BpxTimer,
  timer_,
  u_,
  v_,
  v_0_0_,
} from "@beetpx/beetpx";
import { AudioManager } from "../audio/AudioManager";
import { Collisions } from "../collisions/Collisions";
import { Hero } from "../gameplay/Hero";
import { Light } from "../gameplay/Light";
import { c, g } from "../globals";
import { Scene } from "./Scene";
import { SceneRoomTransition } from "./SceneRoomTransition";

export class SceneTitleAndControls implements Scene {
  constructor() {
    this._hero = new Hero({ center: g.vs.mul(1 / 4, 1 / 2) });
    this._light = new Light({ center: g.vs.mul(3 / 4, 1 / 2) });
  }

  private _canProceed: boolean = false;
  private _slideIn: BpxTimer = timer_(16);
  private _hero: Hero;
  private _light: Light;

  init(): void {
    AudioManager.startMusicDamped();
  }

  update(): void {
    if (b_.wasJustPressed("a")) {
      this._canProceed = true;
    }

    this._slideIn.update();

    this._hero.update(
      b_.areDirectionsPressedAsVector(),
      b_.wasJustPressed("a"),
      b_.wasJustPressed("b"),
      null,
    );
    this._light.update();

    if (
      Collisions.areColliding(
        this._hero.collisionCircle,
        this._light.collisionCircle,
      )
    ) {
    }
  }

  postUpdate(): Scene | null {
    if (
      Collisions.areColliding(
        this._hero.collisionCircle,
        this._light.collisionCircle,
      )
    ) {
      return new SceneRoomTransition({
        fromTitle: true,
        hero: this._hero,
        light: this._light,
      });
    }
    return null;
  }

  draw(): void {
    b_.clearCanvas(c.blueGreen4);
    b_.setCameraXy(v_(0, -16));

    this._hero.draw();
    this._light.draw();

    u_.printWithOutline(
      "Hat Escape",
      v_(8, u_.lerp(-28, -12, BpxEasing.outQuartic(this._slideIn.progress))),
      c.redYellow3,
      c.blueGreen5,
    );

    if (this._slideIn.hasFinished) {
      b_.print("dash: ", v_(8, 24), c.blueGreen3);
      b_.print("attack: ", v_(8, 44), c.blueGreen3);
      b_.print("reach the light! ", v_(8, 64), c.blueGreen3);
    }

    b_.setCameraXy(v_0_0_);
  }
}
