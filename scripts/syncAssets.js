#!/usr/bin/env node

const path = require("path");
const childProcess = require("child_process");
const fs = require("fs");

const watchForChanges = process.argv[2] === "watch";

const ffmpegExecutable = "ffmpeg";

const rootDir = path.resolve(__dirname, "..");
const assetsDir = path.resolve(rootDir, "assets");
const publicDir = path.resolve(rootDir, "public");

//
// WAV --> FLAC
//

const wavInputDir = path.resolve(assetsDir, "wav");
const flacOutputDir = path.resolve(publicDir);

convertWavToFlac(wavInputDir, flacOutputDir);
if (watchForChanges) {
  fs.watchFile(wavInputDir, { interval: 1000 }, () => {
    convertWavToFlac(wavInputDir, flacOutputDir);
  });
}

//
// other assets
//

const otherAssets = [
  { dir: ".", file: "ChevyRay_MagicBook_atlas.png" },
  { dir: ".", file: "ChevyRay_MagicBook_metrics.json" },
  { dir: "sprites", file: "attack.png" },
  { dir: "sprites", file: "hero.png" },
  { dir: "sprites", file: "light.png" },
  { dir: "sprites", file: "tiles.png" },
];

for (const otherAsset of otherAssets) {
  let src = path.resolve(assetsDir, otherAsset.dir, otherAsset.file);
  let dst = path.resolve(publicDir, otherAsset.file);
  fs.copyFileSync(src, dst);
  if (watchForChanges) {
    fs.watchFile(src, { interval: 1000 }, () => {
      fs.copyFileSync(src, dst);
    });
  }
}

////////////////

function convertWavToFlac(wavInputDir, flacOutputDir) {
  console.log(wavInputDir, "-->", flacOutputDir);
  fs.readdirSync(wavInputDir)
    .filter((filename) => filename.toLowerCase().endsWith(".wav"))
    .forEach((filename) => {
      const inputPath = path.resolve(wavInputDir, filename);
      const outputPath = path.resolve(
        flacOutputDir,
        filename.toLowerCase().replace(".wav", ".flac"),
      );
      const shortInputPath = path.relative(rootDir, inputPath);
      const shortOutputPath = path.relative(rootDir, outputPath);
      console.log(`[syncAssets] ${shortInputPath} -> ${shortOutputPath} ...`);

      childProcess.execSync(
        `${ffmpegExecutable} -y -i ${shortInputPath} ${shortOutputPath}`,
        { stdio: "inherit" },
      );
    });
}
