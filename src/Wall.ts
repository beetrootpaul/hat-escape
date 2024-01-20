import { b_, BpxVector2d, rgb_ } from "@beetpx/beetpx";

export class Wall {
  #xy: BpxVector2d;
  #wh: BpxVector2d;

  constructor(xy: BpxVector2d, wh: BpxVector2d) {
    this.#xy = xy;
    this.#wh = wh;
  }

  draw(): void {
    b_.rectFilled(this.#xy, this.#wh, rgb_(80, 80, 160));
  }
}
