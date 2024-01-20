import { b_, BpxVector2d, rgb_, u_, v_ } from "@beetpx/beetpx";
import { CollisionCircle } from "./collisions/CollisionCircle";
import { EnemyTarget } from "./EnemyTarget";

export class Enemy {
  #xy: BpxVector2d;
  #target: EnemyTarget;
  isAlive: boolean = true;

  constructor(xy: BpxVector2d, target: EnemyTarget) {
    this.#xy = xy;
    this.#target = target;
  }

  update(): void {
    const diff = this.#target.getXy().sub(this.#xy);
    const angle = u_.trigAtan2(diff.x, diff.y);
    const speed = 0.5;
    this.#xy = this.#xy.add(
      speed * u_.trigCos(angle + Math.random() * 0.3 - 0.15),
      speed * u_.trigSin(angle + Math.random() * 0.3 - 0.15),
    );
  }

  draw(): void {
    b_.ellipseFilled(this.#xy.sub(3), v_(7, 7), rgb_(200, 50, 50));
  }

  getCollisionCircle(): CollisionCircle {
    return {
      center: this.#xy,
      r: 2,
    };
  }

  destroy() {
    this.isAlive = false;
  }
}
