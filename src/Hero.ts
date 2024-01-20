import {
  b_,
  blue_,
  BpxTimer,
  BpxVector2d,
  green_,
  red_,
  rgb_,
  timer_,
  u_,
  v_,
  v_0_0_,
} from "@beetpx/beetpx";
import { CollisionCircle } from "./collisions/CollisionCircle";
import { EnemyTarget } from "./EnemyTarget";
import { Wall } from "./Wall";

export class Hero implements EnemyTarget {
  #xy: BpxVector2d;
  #speed: BpxVector2d = v_0_0_;
  #attackTimer: BpxTimer | null = null;
  #dashTimer: BpxTimer | null = null;
  #toNextAttackTimer: BpxTimer = timer_(60);
  #toNextDashTimer: BpxTimer = timer_(10);

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
    if (this.#dashTimer) {
      b_.ellipseFilled(this.#xy.sub(3), v_(7, 7), rgb_(80, 120, 20));
    } else {
      b_.ellipseFilled(this.#xy.sub(3), v_(7, 7), rgb_(140, 200, 50));
    }

    if (this.#attackTimer) {
      const size = 23;
      const wh = v_(
        size * u_.trigSin(this.#attackTimer.progress * 2),
        size * u_.trigCos(this.#attackTimer.progress * 2),
      );
      b_.line(this.#xy.sub(wh.div(2)), wh, red_);
    }

    b_.line(
      this.#xy.sub(6, 11),
      v_(u_.lerp(0, 13, this.#toNextDashTimer.progress), 1),
      this.#toNextAttackTimer.hasFinished ? blue_ : rgb_(0, 0, 100),
    );
    b_.line(
      this.#xy.sub(6, 10),
      v_(u_.lerp(0, 13, this.#toNextAttackTimer.progress), 1),
      this.#toNextAttackTimer.hasFinished ? green_ : rgb_(0, 100, 0),
    );
  }

  move(directions: BpxVector2d): void {
    this.#speed = directions.mul(1.2);
    if (this.#speed.x !== 0 && this.#speed.y !== 0) {
      // normalization of diagonal speed
      this.#speed = this.#speed.div(1.44);
    }
  }

  update(walls: Wall[]): void {
    const prevXy = this.#xy;
    const diff = this.isDashing() ? this.#speed.mul(4) : this.#speed;
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

    if (this.#attackTimer?.hasFinished) {
      this.#attackTimer = null;
    }
    if (this.#dashTimer?.hasFinished) {
      this.#dashTimer = null;
    }
    this.#attackTimer?.update();
    this.#dashTimer?.update();

    this.#toNextAttackTimer.update();
    this.#toNextDashTimer.update();
  }

  getCollisionCircle(): CollisionCircle {
    return {
      center: this.#xy,
      r: 3,
    };
  }

  respawnAt(xy: BpxVector2d): void {
    this.#speed = v_0_0_;
    this.#xy = xy;
    while (!this.#toNextAttackTimer.hasFinished) {
      this.#toNextAttackTimer.update();
    }
    while (!this.#toNextDashTimer.hasFinished) {
      this.#toNextDashTimer.update();
    }
    this.#attackTimer = null;
    this.#dashTimer = null;
  }

  canAttack(): boolean {
    return this.#toNextAttackTimer.hasFinished;
  }

  attack(): void {
    this.#attackTimer = timer_(30);
    this.#toNextAttackTimer = timer_(60);
  }

  canDash(): boolean {
    return this.#toNextDashTimer.hasFinished;
  }

  dash(): void {
    this.#dashTimer = timer_(6);
    this.#toNextDashTimer = timer_(60);
  }

  isDashing(): boolean {
    return !!this.#dashTimer;
  }

  getAttackCollisionCircle(): CollisionCircle | null {
    if (this.#attackTimer) {
      return {
        center: this.#xy,
        r: 23,
      };
    }
    return null;
  }
}
