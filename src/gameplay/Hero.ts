import { BpxVector2d, v_0_0_ } from "@beetpx/beetpx";
import { StaticSprite } from "../Sprite";
import { g } from "../globals";

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

  constructor(params: { xy: BpxVector2d }) {
    this._sprite = Hero._spriteLeft;
    this._xy = params.xy;
    this._speed = v_0_0_;
  }

  private _sprite: StaticSprite;
  private _xy: BpxVector2d;
  private _speed: BpxVector2d;

  move(directions: BpxVector2d) {
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
  }

  update(): void {
    this._xy = this._xy.add(this._speed);
  }

  draw(): void {
    this._sprite.draw(this._xy);
  }
}
