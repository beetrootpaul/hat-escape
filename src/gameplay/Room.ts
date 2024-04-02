import { b_, BpxSprite, BpxVector2d, spr_, u_, v_ } from "@beetpx/beetpx";
import { CollisionCircle } from "../collisions/CollisionCircle";
import { g } from "../globals";
import { RoomBlueprint } from "../RoomBlueprints";
import { Wall } from "./Wall";

export class Room {
  private static _sizeTiles: BpxVector2d = v_(16, 14);
  private static _tileFloor: BpxSprite = spr_(g.images.tiles)(8, 8, 40, 0);
  private static _tileWall: BpxSprite = spr_(g.images.tiles)(8, 8, 48, 0);
  private static _tileFloorLighterTL: BpxSprite = spr_(g.images.tiles)(
    8,
    8,
    8,
    0,
  );
  private static _tileFloorLighterTR: BpxSprite = spr_(g.images.tiles)(
    8,
    8,
    16,
    0,
  );
  private static _tileFloorLighterBL: BpxSprite = spr_(g.images.tiles)(
    8,
    8,
    24,
    0,
  );
  private static _tileFloorLighterBR: BpxSprite = spr_(g.images.tiles)(
    8,
    8,
    32,
    0,
  );

  constructor(blueprint: RoomBlueprint) {
    this._blueprint = blueprint;
    this._light = u_.randomElementOf(blueprint.lights)!;
    this._walls = blueprint.wallShapes.map(
      ws => new Wall(ws[0].mul(g.ts), ws[1].mul(g.ts)),
    );
  }

  private readonly _blueprint: RoomBlueprint;
  private readonly _light: RoomBlueprint["lights"][number];
  private readonly _walls: Wall[];

  get center(): BpxVector2d {
    return Room._sizeTiles.mul(g.ts).div(2);
  }

  get lightCenter(): BpxVector2d {
    return this._light.add(1).mul(g.ts);
  }

  get mobSpawners(): BpxVector2d[] {
    return this._blueprint.spawners.map(s => s.mul(g.ts));
  }

  doesCollideWithAnyWall(cc: CollisionCircle): boolean {
    return this._walls.some(w => w.collidesWith(cc));
  }

  draw(): void {
    for (let row = 0; row < Room._sizeTiles.y; row++) {
      for (let col = 0; col < Room._sizeTiles.x; col++) {
        b_.drawSprite(Room._tileFloor, g.ts.mul(col, row));
      }
    }

    b_.drawSprite(
      Room._tileFloorLighterTL,
      g.ts.mul(this._light.x, this._light.y),
    );
    b_.drawSprite(
      Room._tileFloorLighterTR,
      g.ts.mul(this._light.x + 1, this._light.y),
    );
    b_.drawSprite(
      Room._tileFloorLighterBL,
      g.ts.mul(this._light.x, this._light.y + 1),
    );
    b_.drawSprite(
      Room._tileFloorLighterBR,
      g.ts.mul(this._light.x + 1, this._light.y + 1),
    );

    for (const ws of this._blueprint.wallSprites) {
      b_.drawSprite(Room._tileWall, g.ts.mul(ws));
    }
  }
}
