import { b_, v_ } from "@beetpx/beetpx";
import { c } from "../globals";
import { CollisionCircle } from "./CollisionCircle";

export class Collisions {
  static areColliding(cc1: CollisionCircle, cc2: CollisionCircle): boolean {
    const distance = cc2.center.sub(cc1.center);
    const r1r2 = cc1.r + cc2.r;
    return distance.x * distance.x + distance.y * distance.y <= r1r2 * r1r2;
  }

  static drawCollisionCircle(cc: CollisionCircle) {
    b_.ellipse(cc.center.sub(cc.r), v_(2, 2).mul(cc.r), c.redYellow1);
  }
}
