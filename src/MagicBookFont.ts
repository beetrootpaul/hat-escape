import { BpxCharSprite, BpxFont, BpxVector2d, v_ } from "@beetpx/beetpx";
import { g } from "./globals";

export class MagicBookFont implements BpxFont {
  id: string = g.fonts.magicBook;
  imageUrl: string = g.images.font;

  private _metrics: any;
  private _kerningData: Array<{
    leftCode: number;
    rightCode: number;
    kerningX: number;
  }> = [];

  setMetrics(metrics: any): void {
    this._metrics = metrics;
    console.log(metrics.json.kerning.length);
    for (let i = 0; i < metrics.json.kerning.length; i++) {
      this._kerningData.push({
        leftCode: metrics.json.kerning[i * 3],
        rightCode: metrics.json.kerning[i * 3 + 1],
        kerningX: metrics.json.kerning[i * 3 + 2],
      });
    }
    console.log(this._kerningData);
  }

  spritesFor(text: string): BpxCharSprite[] {
    const j = this._metrics.json;
    const sprites: BpxCharSprite[] = [];
    let prevCode = -1;

    let cursor: BpxVector2d = v_(0, j.ascent);
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      const idx = j.chars.indexOf(code);
      if (!idx) {
        // space or something else
        cursor = cursor.add(3, 0);
        prevCode = code;
        continue;
      }

      let kerningX = 0;
      const datum = this._kerningData.find(
        (k) => k.leftCode == prevCode && k.rightCode == code,
      );
      if (datum) {
        kerningX = datum.kerningX;
      }
      cursor = cursor.add(kerningX, 0);

      sprites.push({
        char: text[i]!,
        positionInText: cursor.add(v_(j.offset_x[idx], j.offset_y[idx])),
        type: "image",
        spriteXyWh: [
          v_(j.pack_x[idx], j.pack_y[idx]),
          v_(j.width[idx], j.height[idx]),
        ],
      });

      cursor = cursor.add(j.advance[idx] + 1, 0);
      prevCode = code;
    }

    return sprites;
  }
}
