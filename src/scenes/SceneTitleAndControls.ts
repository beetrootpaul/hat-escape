import {
  $d,
  $spr,
  $timer,
  $u,
  $v,
  $v_0_0,
  $x,
  BpxEasing,
  BpxTimer,
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

  private _slideIn: BpxTimer = $timer(16);
  private readonly _hero: Hero;
  private readonly _light: Light;

  init(): void {
    AudioManager.startMusicDamped();
  }

  update(): void {
    this._hero.update(
      $x.getPressedDirection(),
      $x.wasButtonJustPressed("O"),
      $x.wasButtonJustPressed("X"),
      null,
    );

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
    $d.clearCanvas(c.blueGreen4);
    $d.setCameraXy($v(0, -16));

    if (this._slideIn.hasFinished) {
      $d.sprite($spr(g.images.controls)(128, 48, 0, 0), $v(7, 11));
    }

    this._hero.draw();
    this._light.draw();

    $u.drawTextWithOutline(
      "Hat Escape",
      $v(8, $u.lerp(-28, -12, BpxEasing.outQuartic(this._slideIn.progress))),
      c.redYellow3,
      c.blueGreen5,
    );

    $d.setCameraXy($v_0_0);
  }
}
