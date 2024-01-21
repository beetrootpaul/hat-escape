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
    this._gameplay.hero.move(b_.areDirectionsPressedAsVector());
    this._gameplay.hero.update();
  }

  postUpdate(): Scene | null {
    if (b_.wasJustPressed("a")) {
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
    b_.print(`room ${this._gameplay.currentRoom}`, v_1_1_.add(0, 20), c.green);
    b_.print("TODO", v_1_1_.add(0, 40), c.green);

    this._gameplay.hero.draw();
  }
}
