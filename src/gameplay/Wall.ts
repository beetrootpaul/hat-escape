import { BpxVector2d } from "@beetpx/beetpx";
import { CollisionCircle } from "../collisions/CollisionCircle";

export class Wall {
  constructor(xy: BpxVector2d, wh: BpxVector2d) {
    this._xy = xy.add(0);
    this._wh = wh.sub(0);
  }

  private readonly _xy: BpxVector2d;
  private readonly _wh: BpxVector2d;

  collidesWith(cc: CollisionCircle): boolean {
    return !(
      this._xy.x >= cc.center.x + cc.r ||
      this._xy.y >= cc.center.y + cc.r ||
      this._xy.x + this._wh.x <= cc.center.x - cc.r ||
      this._xy.y + this._wh.y <= cc.center.y - cc.r
    );
  }
}
