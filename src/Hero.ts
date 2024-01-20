import {
  b_,
  BpxTimer,
  BpxVector2d,
  green_,
  red_,
  rgb_,
  timer_,
  u_,
  v_,
} from "@beetpx/beetpx";
import { CollisionCircle } from "./collisions/CollisionCircle";
import { EnemyTarget } from "./EnemyTarget";

export class Hero implements EnemyTarget {
  #xy: BpxVector2d;
  #attackTimer: BpxTimer | null = null;
  #toNextAttackTimer: BpxTimer = timer_(60);

  constructor(xy: BpxVector2d) {
    this.#xy = xy;
    while (!this.#toNextAttackTimer.hasFinished) {
      this.#toNextAttackTimer.update();
    }
  }

  getXy(): BpxVector2d {
    return this.#xy;
  }

  draw(): void {
    b_.ellipseFilled(this.#xy.sub(3), v_(7, 7), rgb_(140, 200, 50));

    if (this.#attackTimer) {
      const size = 15;
      const wh = v_(
        size * u_.trigSin(this.#attackTimer.progress * 2),
        size * u_.trigCos(this.#attackTimer.progress * 2),
      );
      b_.line(this.#xy.sub(wh.div(2)), wh, red_);
    }

    b_.line(
      this.#xy.sub(6, 10),
      v_(u_.lerp(0, 13, this.#toNextAttackTimer.progress), 1),
      this.#toNextAttackTimer.hasFinished ? green_ : rgb_(0, 100, 0),
    );
  }

  move(directions: BpxVector2d): void {
    this.#xy = this.#xy.add(directions);
  }

  update(): void {
    if (this.#attackTimer?.hasFinished) {
      this.#attackTimer = null;
    }
    this.#attackTimer?.update();

    this.#toNextAttackTimer.update();
  }

  getCollisionCircle(): CollisionCircle {
    return {
      center: this.#xy,
      r: 3,
    };
  }

  respawnAt(xy: BpxVector2d): void {
    this.#xy = xy;
    while (!this.#toNextAttackTimer.hasFinished) {
      this.#toNextAttackTimer.update();
    }
    this.#attackTimer = null;
  }

  canAttackAgain(): boolean {
    return this.#toNextAttackTimer.hasFinished;
  }

  attack(): void {
    this.#attackTimer = timer_(30);
    this.#toNextAttackTimer = timer_(60);
  }

  getAttackCollisionCircle(): CollisionCircle | null {
    if (this.#attackTimer) {
      return {
        center: this.#xy,
        r: 15,
      };
    }
    return null;
  }
}
