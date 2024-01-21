import { BpxVector2d, u_, v_ } from "@beetpx/beetpx";

export class RoomBlueprints {
  private static _blueprints: RoomBlueprint[];
  private static _prevBlueprintId: RoomBlueprint["id"] = "---";

  static loadFromLdtkJson(ldtkJson: any): void {
    this._blueprints = ldtkJson.levels.map((l: any) => {
      const rb: RoomBlueprint = {
        id: l.identifier,
        lights: [],
        spawners: [],
        wallShapes: [],
        wallSprites: [],
      };

      rb.lights = l.layerInstances
        .find((li: any) => li.__identifier === "layer_lights_and_walls")!
        .entityInstances.filter(
          (ei: any) => ei.__identifier === "light_position",
        )
        .map((ei: any) => v_(ei.__grid[0]!, ei.__grid[1]!));

      rb.spawners = l.layerInstances
        .find((li: any) => li.__identifier === "layer_tiles")!
        .gridTiles.filter((gt: any) => gt.t === 10)
        .map((gt: any) => [
          v_(Math.ceil(gt.px[0]! / 8), Math.ceil(gt.px[1]! / 8)),
        ]);

      rb.wallShapes = l.layerInstances
        .find((li: any) => li.__identifier === "layer_lights_and_walls")!
        .entityInstances.filter((ei: any) => ei.__identifier === "walls")
        .map((ei: any) => [
          v_(ei.__grid[0]!, ei.__grid[1]!),
          v_(Math.ceil(ei.width / 8), Math.ceil(ei.height / 8)),
        ]);

      rb.wallSprites = l.layerInstances
        .find((li: any) => li.__identifier === "layer_tiles")!
        .gridTiles.filter((gt: any) => gt.t === 6)
        .map((gt: any) =>
          v_(Math.ceil(gt.px[0]! / 8), Math.ceil(gt.px[1]! / 8)),
        );

      return rb;
    });
  }

  static nextRandomBlueprint(): RoomBlueprint {
    if (this._blueprints.length <= 1) {
      return this._blueprints[0]!;
    }

    let nextBlueprint: RoomBlueprint = u_.randomElementOf(this._blueprints)!;
    while (nextBlueprint.id === this._prevBlueprintId) {
      nextBlueprint = u_.randomElementOf(this._blueprints)!;
    }
    this._prevBlueprintId = nextBlueprint?.id;
    return nextBlueprint!;
  }
}

export type RoomBlueprint = {
  id: string;
  lights: BpxVector2d[];
  spawners: BpxVector2d[];
  wallShapes: [BpxVector2d, BpxVector2d][];
  wallSprites: BpxVector2d[];
};
