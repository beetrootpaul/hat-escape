import { BpxVector2d, v_ } from "@beetpx/beetpx";
import { g } from "../globals";

export class Room {
  static random(): Room {
    return new Room();
  }

  private static _sizeTiles: BpxVector2d = v_(16, 14);

  private constructor() {}

  get center(): BpxVector2d {
    return Room._sizeTiles.mul(g.ts).div(2);
  }
}
