import { b_, BpxTimer, BpxVector2d, timer_, u_, v_0_0_ } from "@beetpx/beetpx";
import { CollisionCircle } from "../collisions/CollisionCircle";
import { Collisions } from "../collisions/Collisions";
import { g } from "../globals";
import { AnimatedSprite, StaticSprite } from "../Sprite";
import { Room } from "./Room";

export class Hero {
  private static _spriteLeft = new StaticSprite(
    g.images.hero,
    12,
    12,
    0,
    0,
    true,
  );
  private static _spriteRight = new StaticSprite(
    g.images.hero,
    12,
    12,
    12,
    0,
    true,
  );
  private static _dashActiveFrames: number = 6;
  private static _dashRefreshFrames: number = 20;
  private static _attackActiveFrames: number = 58;
  private static _attackRefreshFrames: number = 20;

  constructor(params: { center: BpxVector2d }) {
    this._sprite = Hero._spriteLeft;
    this._center = params.center;
    this._speed = v_0_0_;
    this._dashTimer = timer_(Hero._dashActiveFrames + Hero._dashRefreshFrames);
    while (!this._dashTimer.hasFinished) {
      this._dashTimer.update();
    }
    this._attackTimer = timer_(
      Hero._attackActiveFrames + Hero._attackRefreshFrames,
    );
    while (!this._attackTimer.hasFinished) {
      this._attackTimer.update();
    }
  }

  private _sprite: StaticSprite;
  private _center: BpxVector2d;
  private _speed: BpxVector2d;
  private _dashTimer: BpxTimer;
  private _attackTimer: BpxTimer;
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
    return this._dashTimer.framesLeft > Hero._dashRefreshFrames;
  }

  get isAttacking(): boolean {
    return this._attackTimer.framesLeft > Hero._attackRefreshFrames;
  }

  update(
    directions: BpxVector2d,
    tryDash: boolean,
    tryAttack: boolean,
    room: Room,
  ): void {
    this._speed = directions.mul(this.isDashing ? 5.2 : 1.3);

    if (this._speed.x !== 0 && this._speed.y !== 0) {
      // normalization of diagonal speed
      this._speed = this._speed.div(1.41);
    }

    if (this._speed.x > 0) {
      this._sprite = Hero._spriteRight;
    } else if (this._speed.x < 0) {
      this._sprite = Hero._spriteLeft;
    }

    const diff = this._speed;
    const prevCenter = this._center;
    this._center = prevCenter.add(diff);
    if (room.doesCollideWithAnyWall(this.collisionCircle)) {
      this._center = prevCenter.add(diff.x, 0);
      if (room.doesCollideWithAnyWall(this.collisionCircle)) {
        this._center = prevCenter.add(0, diff.y);
        if (room.doesCollideWithAnyWall(this.collisionCircle)) {
          this._center = prevCenter;
        }
      }
    }

    if (tryDash && this._dashTimer.hasFinished) {
      this._dashTimer.restart();
    }
    this._dashTimer.update();

    if (!this.isAttacking) {
      this._attackAnimation = null;
    }
    if (tryAttack && this._attackTimer.hasFinished) {
      this._attackTimer.restart();
      this._attackAnimation = new AnimatedSprite(
        g.images.attack,
        24,
        24,
        u_.range(28).reduce((xs, i) => [...xs, i * 24, i * 24], [] as number[]),
        0,
        true,
      );
    }
    this._attackTimer.update();

    this._attackAnimation?.update();
  }

  draw(): void {
    this._sprite.draw(this._center);
    this._attackAnimation?.draw(this._center);
    if (b_.debug) {
      Collisions.drawCollisionCircle(this.collisionCircle);
      if (this.isAttacking) {
        Collisions.drawCollisionCircle(this.attackCollisionCircle);
      }
    }
  }
}
