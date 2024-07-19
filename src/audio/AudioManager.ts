import { $, BpxAudioPlaybackId } from "@beetpx/beetpx";
import { g } from "../globals";

export class AudioManager {
  private static _playbackMusicDamped: BpxAudioPlaybackId | null = null;
  private static _playbackMusicRegular: BpxAudioPlaybackId | null = null;

  static startMusicDamped(): void {
    this._playbackMusicDamped = $.startPlaybackSequence({
      loop: [
        [
          { url: g.music.drums1Damped },
          { url: g.music.bass1Damped },
          { url: g.music.melody1Damped },
        ],
        [
          { url: g.music.drums1Damped },
          { url: g.music.bass1Damped },
          { url: g.music.melody2Damped },
        ],
      ],
    });
    this._playbackMusicRegular = $.startPlaybackSequence(
      {
        loop: [
          [
            { url: g.music.drums1 },
            { url: g.music.bass1 },
            { url: g.music.melody1 },
          ],
          [
            { url: g.music.drums1 },
            { url: g.music.bass1 },
            { url: g.music.melody2 },
          ],
        ],
      },
      { muteOnStart: true },
    );
  }

  static makeMusicNotDamped() {
    if (this._playbackMusicDamped) {
      $.mutePlayback(this._playbackMusicDamped);
    }
    if (this._playbackMusicRegular) {
      $.unmutePlayback(this._playbackMusicRegular);
    }
  }

  static makeMusicDamped() {
    if (this._playbackMusicDamped) {
      $.unmutePlayback(this._playbackMusicDamped);
    }
    if (this._playbackMusicRegular) {
      $.mutePlayback(this._playbackMusicRegular);
    }
  }
}
