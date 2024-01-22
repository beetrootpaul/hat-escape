import { b_, v_1_1_ } from "@beetpx/beetpx";
import { Gameplay } from "../gameplay/Gameplay";
import { c } from "../globals";
import { Scene } from "./Scene";
import { SceneRoomTransition } from "./SceneRoomTransition";

export class SceneRoomGameplay implements Scene {
  constructor(params: { gameplay: Gameplay }) {
    this._gameplay = params.gameplay;
  }

  private readonly _gameplay: Gameplay;

  init(): void {}

  update(): void {
    this._gameplay.light.update();
    this._gameplay.hero.move(b_.areDirectionsPressedAsVector());
    this._gameplay.hero.update();
  }

  postUpdate(): Scene | null {
    if (this._gameplay.didHeroReachedLight()) {
      return new SceneRoomTransition({
        gameplay: this._gameplay,
        success: true,
      });
    }
    if (b_.wasJustPressed("b")) {
      return new SceneRoomTransition({
        gameplay: this._gameplay,
        success: false,
      });
    }
    return null;
  }

  draw(): void {
    b_.clearCanvas(c.black);
    b_.print("gameplay", v_1_1_, c.green);
    b_.print(`room ${this._gameplay.roomNumber}`, v_1_1_.add(0, 20), c.green);
    b_.print("TODO", v_1_1_.add(0, 40), c.green);

    this._gameplay.room.draw();
    this._gameplay.hero.draw();
    this._gameplay.light.draw();
  }
}
