import { b_, BpxVector2d, v_0_0_ } from "@beetpx/beetpx";
import { CollisionCircle } from "../collisions/CollisionCircle";
import { Collisions } from "../collisions/Collisions";
import { g } from "../globals";
import { StaticSprite } from "../Sprite";
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

  constructor(params: { center: BpxVector2d }) {
    this._sprite = Hero._spriteLeft;
    this._center = params.center;
    this._speed = v_0_0_;
  }

  private _sprite: StaticSprite;
  private _center: BpxVector2d;
  private _speed: BpxVector2d;

  get collisionCircle(): CollisionCircle {
    return {
      center: this._center,
      r: 4,
    };
  }

  update(directions: BpxVector2d, room: Room): void {
    this._speed = directions.mul(1.3);
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
  }

  draw(): void {
    this._sprite.draw(this._center);
    if (b_.debug) {
      Collisions.drawCollisionCircle(this.collisionCircle);
    }
  }
}
