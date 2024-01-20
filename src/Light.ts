import { b_, BpxVector2d, rgb_, v_ } from "@beetpx/beetpx";
import { CollisionCircle } from "./collisions/CollisionCircle";

export class Light {
  #xy: BpxVector2d;

  constructor(xy: BpxVector2d) {
    this.#xy = xy;
  }

  draw(): void {
    b_.ellipseFilled(this.#xy.sub(3), v_(4, 4), rgb_(140, 140, 140));
  }

  getCollisionCircle(): CollisionCircle {
    return {
      center: this.#xy,
      r: 4,
    };
  }
}
