import { BpxFont, BpxGlyph, BpxRgbColor, spr_, v_ } from "@beetpx/beetpx";
import { g } from "./globals";

type Metrics = {
  name: string;
  size: number;
  ascent: number;
  descent: number;
  char_count: number;
  kerning_count: number;
  chars: number[];
  advance: number[];
  offset_x: number[];
  offset_y: number[];
  width: number[];
  height: number[];
  pack_x: number[];
  pack_y: number[];
  kerning: number[];
};

export class MagicBookFont extends BpxFont {
  readonly spriteSheetUrls = [g.images.font];

  isSpriteSheetTextColor(color: BpxRgbColor | null): boolean {
    return color?.cssHex === "#ffffff" || color?.cssHex === "#fefefe";
  }

  ascent = 0;
  descent = 0;
  lineGap = 3;

  protected mapChar(char: string): string {
    return char;
  }

  readonly glyphs = new Map<string, BpxGlyph>([]);

  constructor(metrics: Metrics) {
    super();

    this.ascent = metrics.ascent;
    this.descent = -metrics.descent;

    metrics.chars.forEach((charCode, idx) => {
      this.glyphs.set(String.fromCharCode(charCode), {
        type: "sprite",
        sprite: spr_(g.images.font)(
          metrics.width[idx]!,
          metrics.height[idx]!,
          metrics.pack_x[idx]!,
          metrics.pack_y[idx]!,
        ),
        offset: v_(
          metrics.offset_x[idx]!,
          metrics.height[idx]! + metrics.offset_y[idx]!,
        ),
        advance: metrics.advance[idx]! + 1,
      });
    });

    for (let idx = 0; idx < metrics.kerning_count; idx++) {
      const charLeft = String.fromCharCode(metrics.kerning[3 * idx]!);
      const charRight = String.fromCharCode(metrics.kerning[3 * idx + 1]!);
      const kerning = metrics.kerning[3 * idx + 2]!;
      const glyph = this.glyphs.get(charRight);
      if (glyph) {
        glyph.kerning ??= {};
        glyph.kerning[charLeft] = kerning;
      }
    }

    // manual corrections to the font
    this.glyphs.get("j")!.advance += 1;
  }
}
