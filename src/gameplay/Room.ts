import { b_, BpxSprite, BpxVector2d, spr_, v_ } from "@beetpx/beetpx";
import { g } from "../globals";
import { RoomBlueprint } from "../RoomBlueprints";

export class Room {
  private static _sizeTiles: BpxVector2d = v_(16, 14);
  private static _tileFloor: BpxSprite = spr_(g.images.tiles)(40, 0, 8, 8);
  private static _tileWall: BpxSprite = spr_(g.images.tiles)(48, 0, 8, 8);

  constructor(blueprint: RoomBlueprint) {
    this._blueprint = blueprint;
  }

  private readonly _blueprint: RoomBlueprint;

  get center(): BpxVector2d {
    return Room._sizeTiles.mul(g.ts).div(2);
  }

  draw(): void {
    for (let row = 0; row < Room._sizeTiles.y; row++) {
      for (let col = 0; col < Room._sizeTiles.x; col++) {
        b_.sprite(Room._tileFloor, g.ts.mul(col, row));
      }
    }
    for (const ws of this._blueprint.wallSprites) {
      b_.sprite(Room._tileWall, g.ts.mul(ws));
    }
  }
}
