import { b_, BpxTimer, timer_, v_1_1_ } from "@beetpx/beetpx";
import { c } from "../globals";
import { Scene } from "./Scene";
import { SceneTitleAndControls } from "./SceneTitleAndControls";

export class SceneBrp implements Scene {
  private _timer: BpxTimer = timer_(60);

  init(): void {}

  update(): void {
    if (
      b_.wasJustPressed("a") ||
      b_.wasJustPressed("b") ||
      b_.wasJustPressed("menu") ||
      b_.wasJustPressed("up") ||
      b_.wasJustPressed("down") ||
      b_.wasJustPressed("right") ||
      b_.wasJustPressed("left")
    ) {
      while (!this._timer.hasFinished) {
        this._timer.update();
      }
    }

    this._timer.update();
  }

  postUpdate(): Scene | null {
    return this._timer.hasFinished ? new SceneTitleAndControls() : null;
  }

  draw(): void {
    b_.clearCanvas(c.black);
    b_.print("Beetroot Paul logo", v_1_1_, c.green);
    b_.print("TODO", v_1_1_.add(0, 40), c.green);
  }
}
