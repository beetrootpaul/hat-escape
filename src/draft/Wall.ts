import { b_, BpxVector2d, rgb_ } from "@beetpx/beetpx";
import { CollisionCircle } from "../collisions/CollisionCircle";

export class Wall {
  #xy: BpxVector2d;
  #wh: BpxVector2d;

  constructor(xy: BpxVector2d, wh: BpxVector2d) {
    this.#xy = xy;
    this.#wh = wh;
  }

  draw(): void {
    b_.rectFilled(this.#xy, this.#wh, rgb_(80, 80, 160));
  }

  /*
    TODO: better implementation:
    function rchitbox(r,c)
      return (mid(r.x,r.x+r.w,c.x)-c.x)^2+(mid(r.y,r.y+r.h,c.y)-c.y)^2<c.r^2
    end
   */
  collidesWith(cc: CollisionCircle): boolean {
    return !(
      this.#xy.x > cc.center.x + cc.r ||
      this.#xy.y > cc.center.y + cc.r ||
      this.#xy.x + this.#wh.x < cc.center.x - cc.r ||
      this.#xy.y + this.#wh.y < cc.center.y - cc.r
    );
  }
}
