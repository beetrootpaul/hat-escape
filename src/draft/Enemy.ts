import { b_, BpxVector2d, rgb_, u_, v_ } from "@beetpx/beetpx";
import { CollisionCircle } from "../collisions/CollisionCircle";
import { Wall } from "../gameplay/Wall";
import { EnemyTarget } from "./EnemyTarget";

export class Enemy {
  #xy: BpxVector2d;
  #target: EnemyTarget;
  isAlive: boolean = true;

  constructor(xy: BpxVector2d, target: EnemyTarget) {
    this.#xy = xy;
    this.#target = target;
  }

  update(walls: Wall[]): void {
    const distance = this.#target.getXy().sub(this.#xy);
    const angle = u_.trigAtan2(distance.x, distance.y);
    const speed = 0.9;
    const prevXy = this.#xy;

    const diff = v_(
      speed * u_.trigCos(angle + Math.random() * 0.5 - 0.25),
      speed * u_.trigSin(angle + Math.random() * 0.5 - 0.25),
    );
    this.#xy = this.#xy.add(diff);
    if (walls.some((w) => w.collidesWith(this.getCollisionCircle()))) {
      this.#xy = prevXy.add(diff.x, 0);
      if (walls.some((w) => w.collidesWith(this.getCollisionCircle()))) {
        this.#xy = prevXy.add(0, diff.y);
        if (walls.some((w) => w.collidesWith(this.getCollisionCircle()))) {
          this.#xy = prevXy;
        }
      }
    }

    if (walls.some((w) => w.collidesWith(this.getCollisionCircle()))) {
      this.#xy = prevXy;
    }
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
