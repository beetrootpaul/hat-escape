import { b_, BpxVector2d, rgb_, v_ } from "@beetpx/beetpx";
import { CollisionCircle } from "../collisions/CollisionCircle";

export class Light {
  #xy: BpxVector2d;

  constructor(xy: BpxVector2d) {
    this.#xy = xy;
  }

  draw(): void {
    b_.ellipseFilled(this.#xy.sub(5), v_(10, 10), rgb_(240, 240, 240));
  }

  getCollisionCircle(): CollisionCircle {
    return {
      center: this.#xy,
      r: 6,
    };
  }
}
