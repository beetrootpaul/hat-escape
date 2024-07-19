import { $, BpxVector2d } from "@beetpx/beetpx";
import { AnimatedSprite } from "../Sprite";
import { CollisionCircle } from "../collisions/CollisionCircle";
import { Collisions } from "../collisions/Collisions";
import { g } from "../globals";

export class Light {
  constructor(params: { center: BpxVector2d }) {
    this._center = params.center;
  }

  private readonly _center: BpxVector2d;
  private readonly _sprite: AnimatedSprite = new AnimatedSprite(
    g.images.light,
    16,
    32,
    [
      0, 0, 0, 0, 16, 16, 16, 16, 32, 32, 32, 32, 48, 48, 48, 48, 64, 64, 64,
      64, 80, 80, 80, 80, 96, 96, 96, 96, 112, 112, 112, 112,
    ],
    0,
    true,
  );

  get collisionCircle(): CollisionCircle {
    return {
      center: this._center,
      r: 5,
    };
  }

  draw(): void {
    this._sprite.draw(this._center.sub(0, 8));
    if ($.debug) {
      Collisions.drawCollisionCircle(this.collisionCircle);
    }
  }
}
