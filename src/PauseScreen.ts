import { b_, black_, v_1_1_, white_ } from "@beetpx/beetpx";
import { g } from "./globals";

export class PauseScreen {
  static isGamePaused: boolean = false;

  draw(): void {
    b_.clearCanvas(black_);
    b_.rect(v_1_1_, g.viewport.sub(2), white_);
  }
}
