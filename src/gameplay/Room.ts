import { $d, $spr, $u, $v, BpxSprite, BpxVector2d } from "@beetpx/beetpx";
import { RoomBlueprint } from "../RoomBlueprints";
import { CollisionCircle } from "../collisions/CollisionCircle";
import { g } from "../globals";
import { Wall } from "./Wall";

export class Room {
  private static _sizeTiles: BpxVector2d = $v(16, 14);
  private static _tileFloor: BpxSprite = $spr(g.images.tiles)(8, 8, 40, 0);
  private static _tileWall: BpxSprite = $spr(g.images.tiles)(8, 8, 48, 0);
  private static _tileFloorLighterTL: BpxSprite = $spr(g.images.tiles)(
    8,
    8,
    8,
    0,
  );
  private static _tileFloorLighterTR: BpxSprite = $spr(g.images.tiles)(
    8,
    8,
    16,
    0,
  );
  private static _tileFloorLighterBL: BpxSprite = $spr(g.images.tiles)(
    8,
    8,
    24,
    0,
  );
  private static _tileFloorLighterBR: BpxSprite = $spr(g.images.tiles)(
    8,
    8,
    32,
    0,
  );

  constructor(blueprint: RoomBlueprint) {
    this._blueprint = blueprint;
    this._light = $u.randOf(blueprint.lights)!;
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
        $d.sprite(Room._tileFloor, g.ts.mul(col, row));
      }
    }

    $d.sprite(Room._tileFloorLighterTL, g.ts.mul(this._light.x, this._light.y));
    $d.sprite(
      Room._tileFloorLighterTR,
      g.ts.mul(this._light.x + 1, this._light.y),
    );
    $d.sprite(
      Room._tileFloorLighterBL,
      g.ts.mul(this._light.x, this._light.y + 1),
    );
    $d.sprite(
      Room._tileFloorLighterBR,
      g.ts.mul(this._light.x + 1, this._light.y + 1),
    );

    for (const ws of this._blueprint.wallSprites) {
      $d.sprite(Room._tileWall, g.ts.mul(ws));
    }
  }
}
