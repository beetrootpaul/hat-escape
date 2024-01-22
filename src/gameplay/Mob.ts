import { b_, BpxVector2d, u_, v_ } from "@beetpx/beetpx";
import { CollisionCircle } from "../collisions/CollisionCircle";
import { Collisions } from "../collisions/Collisions";
import { g } from "../globals";
import { AnimatedSprite } from "../Sprite";
import { Room } from "./Room";

export class Mob {
  constructor(params: { center: BpxVector2d; target: MobTarget }) {
    this._center = params.center;
    this._target = params.target;
  }

  private _center: BpxVector2d;
  private _target: MobTarget;
  private _sprite: AnimatedSprite = new AnimatedSprite(
    g.images.tiles,
    8,
    8,
    [64, 64, 64, 64, 64, 64, 64, 64, 72, 72, 72, 72, 72, 72, 72, 72],
    0,
    true,
  );

  get collisionCircle(): CollisionCircle {
    return {
      center: this._center,
      r: 3,
    };
  }

  update(room: Room): void {
    this._sprite.update();

    const distance = this._target.collisionCircle.center.sub(this._center);
    const angle = u_.trigAtan2(distance.x, distance.y);
    const speed = 0.7;

    const diff = v_(speed * u_.trigCos(angle), speed * u_.trigSin(angle));
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

export interface MobTarget {
  get collisionCircle(): CollisionCircle;
}
