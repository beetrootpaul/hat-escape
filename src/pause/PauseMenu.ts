import { b_, BpxPixels, BpxVector2d, v_, v_0_0_ } from "@beetpx/beetpx";
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
      this._isActive = false;
    });

    this._entries = [
      this._entryResume,
      new PauseMenuEntryToggle(
        "sound:",
        () => !b_.isAudioMuted(),
        (newValue) => {
          if (newValue) {
            b_.unmuteAudio();
          } else {
            b_.muteAudio();
          }
        },
      ),
      new PauseMenuEntrySimple("reboot", () => {
        b_.restart();
      }),
    ];
  }

  private _isActive: boolean = false;
  private readonly _entries: PauseMenuEntry[];
  private _focusedEntry: number = 0;
  private readonly _entryResume: PauseMenuEntry | null = null;

  get isActive(): boolean {
    return this._isActive;
  }

  update(): void {
    if (!this.isActive) {
      if (b_.wasButtonJustPressed("menu")) {
        this._isActive = true;
      }
      return;
    }

    if (
      this.isActive &&
      (b_.wasButtonJustPressed("menu") || b_.wasButtonJustPressed("b"))
    ) {
      this._entryResume?.execute();
      return;
    }

    if (b_.wasButtonJustPressed("a")) {
      this._entries[this._focusedEntry]!.execute();
    }

    if (b_.wasButtonJustPressed("up")) {
      this._focusedEntry =
        (this._focusedEntry - 1 + this._entries.length) % this._entries.length;
    }
    if (b_.wasButtonJustPressed("down")) {
      this._focusedEntry = (this._focusedEntry + 1) % this._entries.length;
    }

    this._entries.forEach((entry, index) => {
      entry.update(this._focusedEntry === index);
    });
  }

  draw(): void {
    if (!this.isActive) return;

    this._dimContentBehind();

    let wh = this._entries.reduce(
      (whTotal, entry, index) =>
        v_(
          Math.max(
            whTotal.x,
            PauseMenu._padding.left + entry.size.x + PauseMenu._padding.right,
          ),
          whTotal.y +
            entry.size.y +
            (index < this._entries.length - 1
              ? PauseMenu._gapBetweenEntries
              : 0),
        ),
      v_(
        PauseMenu._padding.left + PauseMenu._padding.right,
        PauseMenu._padding.top + PauseMenu._padding.bottom,
      ),
    );
    // make sure the width is even, therefore the pause menu will be placed horizontally in the center
    wh = v_(wh.x % 2 ? wh.x + 1 : wh.x, wh.y);
    let xy = g.vs.sub(wh).div(2);

    this._drawMenuBox(xy, wh);

    this._entries.forEach((entry, index) => {
      this._drawEntry(entry, index, xy);
      xy = xy.add(0, entry.size.y + PauseMenu._gapBetweenEntries);
    });
  }

  private _dimContentBehind(): void {
    b_.takeCanvasSnapshot();
    b_.drawRectFilled(v_0_0_, g.vs, cm.snapshotDarker);
  }

  private _drawMenuBox(xy: BpxVector2d, wh: BpxVector2d): void {
    b_.drawRectFilled(xy.sub(2), wh.add(4), c.blueGreen5);

    b_.drawRect(xy.sub(1), wh.add(2), c.redYellow2);
  }

  private _drawEntry(
    entry: PauseMenuEntry,
    entryIndex: number,
    xy: BpxVector2d,
  ): void {
    xy = xy.add(PauseMenu._padding.left, PauseMenu._padding.top);

    entry.draw(xy);

    if (this._focusedEntry === entryIndex) {
      b_.drawPixels(PauseMenu._arrowPixels, xy.add(-7, 4), c.redYellow2);
    }
  }
}
