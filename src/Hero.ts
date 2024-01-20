import { b_, BpxVector2d, rgb_, v_ } from "@beetpx/beetpx";
import { CollisionCircle } from "./collisions/CollisionCircle";
import { EnemyTarget } from "./EnemyTarget";

export class Hero implements EnemyTarget {
  #xy: BpxVector2d;

  constructor(xy: BpxVector2d) {
    this.#xy = xy;
  }

  getXy(): BpxVector2d {
    return this.#xy;
  }

  draw(): void {
    b_.ellipseFilled(this.#xy.sub(3), v_(7, 7), rgb_(140, 200, 50));
  }

  move(directions: BpxVector2d): void {
    this.#xy = this.#xy.add(directions);
  }

  getCollisionCircle(): CollisionCircle {
    return {
      center: this.#xy,
      r: 3,
    };
  }

  respawnAt(xy: BpxVector2d): void {
    this.#xy = xy;
  }
}
