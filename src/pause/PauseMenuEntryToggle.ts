import { b_, BpxVector2d, u_ } from "@beetpx/beetpx";
import { c } from "../globals";
import { PauseMenuEntry } from "./PauseMenuEntry";

export class PauseMenuEntryToggle implements PauseMenuEntry {
  constructor(
    text: string,
    getValue: () => boolean,
    onToggle: (newValue: boolean) => void,
  ) {
    this._label = text;
    this._getValue = getValue;
    this._onToggle = onToggle;

    this._value = this._getValue();

    this._labelSize = u_.measureText(this._label)[1];
    this._yesW = u_.measureText(this._yes)[1].x;
    this._orW = u_.measureText(this._or)[1].x;
    this._noW = u_.measureText(this._no)[1].x;
    this.size = this._labelSize.add(
      this._gapLabelYes +
        this._yesW +
        this._gapYesOrNo +
        this._orW +
        this._gapYesOrNo +
        this._noW,
      0,
    );
  }

  private readonly _label: string;
  private readonly _yes: string = "yes";
  private readonly _or: string = "/";
  private readonly _no: string = "no";

  private _isFocused: boolean = false;

  private _value: boolean;

  private readonly _labelSize: BpxVector2d;
  private readonly _yesW: number;
  private readonly _orW: number;
  private readonly _noW: number;
  private readonly _gapLabelYes: number = 3;
  private readonly _gapYesOrNo: number = 2;
  readonly size: BpxVector2d;

  private readonly _getValue: () => boolean;
  private readonly _onToggle: (newValue: boolean) => void;

  execute() {
    this._onToggle(!this._value);
  }

  update(isFocused: boolean): void {
    this._isFocused = isFocused;
    this._value = this._getValue();
  }

  draw(xy: BpxVector2d): void {
    b_.print(this._label, xy, this._isFocused ? c.white : c.blue);
    b_.print(
      this._yes,
      xy.add(this._labelSize.x + this._gapLabelYes, 0),
      this._value ? (this._isFocused ? c.white : c.white) : c.blue,
    );
    b_.print(
      this._or,
      xy.add(
        this._labelSize.x + this._gapLabelYes + this._yesW + this._gapYesOrNo,
        0,
      ),
      c.blue,
    );
    b_.print(
      this._no,
      xy.add(
        this._labelSize.x +
          this._gapLabelYes +
          this._yesW +
          this._gapYesOrNo +
          this._orW +
          this._gapYesOrNo,
        0,
      ),
      this._value ? c.blue : this._isFocused ? c.white : c.white,
    );
  }
}
