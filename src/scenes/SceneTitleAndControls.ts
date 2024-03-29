import {
  b_,
  BpxEasing,
  BpxTimer,
  spr_,
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
    this._hero = new Hero({ center: g.vs.mul(1 / 4, 3 / 5) });
    this._light = new Light({ center: g.vs.mul(3 / 4, 3 / 5) });
  }

  private _slideIn: BpxTimer = timer_(16);
  private _hero: Hero;
  private _light: Light;

  init(): void {
    AudioManager.startMusicDamped();
  }

  update(): void {
    this._slideIn.update();

    this._hero.update(
      b_.getPressedDirection(),
      b_.wasButtonJustPressed("a"),
      b_.wasButtonJustPressed("b"),
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

    if (this._slideIn.hasFinished) {
      b_.drawSprite(spr_(g.images.controls)(0, 0, 128, 48), v_(7, 11));
      // b_.drawText("dash: ", v_(8, 12), c.blueGreen1);
      // b_.drawText("attack: ", v_(8, 28), c.blueGreen1);
      // b_.drawText("reach the light! ", v_(8, 44), c.blueGreen1);
    }

    this._hero.draw();
    this._light.draw();

    u_.drawTextWithOutline(
      "Hat Escape",
      v_(8, u_.lerp(-28, -12, BpxEasing.outQuartic(this._slideIn.progress))),
      c.redYellow3,
      c.blueGreen5,
    );

    b_.setCameraXy(v_0_0_);
  }
}
