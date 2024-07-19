import { $, $d, $v, $v_0_0, BpxPixels, BpxVector2d } from "@beetpx/beetpx";
import { c, cm, g } from "../globals";
import { PauseMenuEntry } from "./PauseMenuEntry";
import { PauseMenuEntrySimple } from "./PauseMenuEntrySimple";
import { PauseMenuEntryToggle } from "./PauseMenuEntryToggle";

export class PauseMenu {
  static _padding = {
    left: 14,
    right: 10,
    top: 4,
    bottom: 8,
  };
  static _gapBetweenEntries = 6;

  static _arrowPixels = BpxPixels.from(`
    #--
    ##-
    ###
    ##-
    #--
  `);

  constructor() {
    this._entryResume = new PauseMenuEntrySimple("resume", () => {
      $.resume();
    });

    this._entries = [
      this._entryResume,
      new PauseMenuEntryToggle(
        "sound:",
        () => !$.isAudioMuted(),
        newValue => {
          if (newValue) {
            $.unmuteAudio();
          } else {
            $.muteAudio();
          }
        },
      ),
      new PauseMenuEntrySimple("reboot", () => {
        $.restart();
      }),
    ];
  }

  private readonly _entries: PauseMenuEntry[];
  private _focusedEntry: number = 0;
  private readonly _entryResume: PauseMenuEntry | null = null;

  get isActive(): boolean {
    return $.isPaused;
  }

  update(): void {
    if (!this.isActive) {
      return;
    }

    if ($.wasButtonJustPressed("b")) {
      this._entryResume?.execute();
      return;
    }

    if ($.wasButtonJustPressed("a")) {
      this._entries[this._focusedEntry]!.execute();
    }

    if ($.wasButtonJustPressed("up")) {
      this._focusedEntry =
        (this._focusedEntry - 1 + this._entries.length) % this._entries.length;
    }
    if ($.wasButtonJustPressed("down")) {
      this._focusedEntry = (this._focusedEntry + 1) % this._entries.length;
    }

    this._entries.forEach((entry, index) => {
      entry.update(this._focusedEntry === index);
    });
  }

  draw(): void {
    if (!$.isPaused) return;

    this._dimContentBehind();

    let wh = this._entries.reduce(
      (whTotal, entry, index) =>
        $v(
          Math.max(
            whTotal.x,
            PauseMenu._padding.left + entry.size.x + PauseMenu._padding.right,
          ),
          whTotal.y +
            entry.size.y +
            (index < this._entries.length - 1 ?
              PauseMenu._gapBetweenEntries
            : 0),
        ),
      $v(
        PauseMenu._padding.left + PauseMenu._padding.right,
        PauseMenu._padding.top + PauseMenu._padding.bottom,
      ),
    );
    // make sure the width is even, therefore the pause menu will be placed horizontally in the center
    wh = $v(wh.x % 2 ? wh.x + 1 : wh.x, wh.y);
    let xy = g.vs.sub(wh).div(2);

    this._drawMenuBox(xy, wh);

    this._entries.forEach((entry, index) => {
      this._drawEntry(entry, index, xy);
      xy = xy.add(0, entry.size.y + PauseMenu._gapBetweenEntries);
    });
  }

  private _dimContentBehind(): void {
    $d.takeCanvasSnapshot();
    $d.rectFilled($v_0_0, g.vs, cm.snapshotDarker);
  }

  private _drawMenuBox(xy: BpxVector2d, wh: BpxVector2d): void {
    $d.rectFilled(xy.sub(2), wh.add(4), c.blueGreen5);

    $d.rect(xy.sub(1), wh.add(2), c.redYellow2);
  }

  private _drawEntry(
    entry: PauseMenuEntry,
    entryIndex: number,
    xy: BpxVector2d,
  ): void {
    xy = xy.add(PauseMenu._padding.left, PauseMenu._padding.top);

    entry.draw(xy);

    if (this._focusedEntry === entryIndex) {
      $d.pixels(PauseMenu._arrowPixels, xy.add(-7, 4), c.redYellow2);
    }
  }
}
