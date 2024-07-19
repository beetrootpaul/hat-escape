import { $d, $v } from "@beetpx/beetpx";
import { c, g } from "./globals";

export class Hud {
  draw(currentRoom: number, maxRoom: number): void {
    const roomLabelSize = $d.measureText("ROOM").wh;
    $d.text("ROOM", $v(2, g.vs.y - 3 - roomLabelSize.y), c.redYellow3);
    $d.text(
      currentRoom.toString(),
      $v(2 + roomLabelSize.x + 6, g.vs.y - 3 - roomLabelSize.y),
      c.redYellow2,
    );

    const bestLabelSize = $d.measureText("BEST").wh;
    $d.text(
      "BEST",
      $v(g.vs.x - 2 - bestLabelSize.x, g.vs.y - 3 - bestLabelSize.y),
      c.blueGreen2,
    );
    const maxRoomSize = $d.measureText(maxRoom.toString()).wh;
    $d.text(
      maxRoom.toString(),
      $v(
        g.vs.x - 2 - bestLabelSize.x - 6 - maxRoomSize.x,
        g.vs.y - 3 - bestLabelSize.y,
      ),
      c.blueGreen1,
    );
  }
}
