import {
  b_,
  BpxTimerSequence,
  BpxVector2d,
  timerSeq_,
  u_,
  v_0_0_,
} from "@beetpx/beetpx";
import { CollisionCircle } from "../collisions/CollisionCircle";
import { Collisions } from "../collisions/Collisions";
import { g } from "../globals";
import { AnimatedSprite, StaticSprite } from "../Sprite";
import { Room } from "./Room";

export class Hero {
  private static _sprite = new StaticSprite(g.images.hero, 12, 12, 12, 0, true);
  private static _dashActiveFrames: number = 6;
  private static _dashRefreshFrames: number = 20;
  private static _attackActiveFrames: number = 58;
  private static _attackRefreshFrames: number = 20;

  constructor(params: { center: BpxVector2d }) {
    this._center = params.center;
  }

  private readonly _sprite: StaticSprite = Hero._sprite;
  private _directionRight: boolean = true;
  private _center: BpxVector2d;
  private _speed: BpxVector2d = v_0_0_;
  private _dashTimer?: BpxTimerSequence<"active" | "refresh">;
  private _attackTimer?: BpxTimerSequence<"active" | "refresh">;
  private _attackAnimation: AnimatedSprite | null = null;

  get collisionCircle(): CollisionCircle {
    return {
      center: this._center,
      r: 4,
    };
  }

  get attackCollisionCircle(): CollisionCircle {
    return {
      center: this._center,
      r: 14,
    };
  }

  get isDashing(): boolean {
    return this._dashTimer?.currentPhase === "active";
  }

  get isAttacking(): boolean {
    return this._attackTimer?.currentPhase === "active";
  }

  pauseAnimationsAndTimers(): void {
    this._attackAnimation?.pause();
    this._attackTimer?.pause();
    this._dashTimer?.pause();
  }

  resumeAnimationsAndTimers(): void {
    this._attackAnimation?.resume();
    this._attackTimer?.resume();
    this._dashTimer?.resume();
  }

  update(
    directions: BpxVector2d,
    tryDash: boolean,
    tryAttack: boolean,
    room: Room | null,
  ): void {
    this._speed = directions.mul(this.isDashing ? 5.2 : 1.3);

    if (this._speed.x !== 0 && this._speed.y !== 0) {
      // normalization of diagonal speed
      this._speed = this._speed.div(1.41);
    }

    if (this._speed.x > 0) {
      this._directionRight = true;
    } else if (this._speed.x < 0) {
      this._directionRight = false;
    }

    const diff = this._speed;
    const prevCenter = this._center;
    this._center = prevCenter.add(diff);
    if (room?.doesCollideWithAnyWall(this.collisionCircle)) {
      this._center = prevCenter.add(diff.x, 0);
      if (room.doesCollideWithAnyWall(this.collisionCircle)) {
        this._center = prevCenter.add(0, diff.y);
        if (room.doesCollideWithAnyWall(this.collisionCircle)) {
          this._center = prevCenter;
        }
      }
    }

    if (tryDash && (!this._dashTimer || this._dashTimer.hasFinishedOverall)) {
      this._dashTimer = timerSeq_({
        intro: [
          ["active", Hero._dashActiveFrames],
          ["refresh", Hero._dashRefreshFrames],
        ],
      });
    }

    if (!this.isAttacking) {
      this._attackAnimation = null;
    }
    if (
      tryAttack &&
      (!this._attackTimer || this._attackTimer.hasFinishedOverall)
    ) {
      this._attackTimer = timerSeq_({
        intro: [
          ["active", Hero._attackActiveFrames],
          ["refresh", Hero._attackRefreshFrames],
        ],
      });
      this._attackAnimation = new AnimatedSprite(
        g.images.attack,
        24,
        24,
        u_.range(28).reduce((xs, i) => [...xs, i * 24, i * 24], [] as number[]),
        0,
        true,
      );
    }
  }

  draw(): void {
    this._sprite.draw(this._center, !this._directionRight);
    this._attackAnimation?.draw(this._center);
    if (b_.debug) {
      Collisions.drawCollisionCircle(this.collisionCircle);
      if (this.isAttacking) {
        Collisions.drawCollisionCircle(this.attackCollisionCircle);
      }
    }
  }
}
