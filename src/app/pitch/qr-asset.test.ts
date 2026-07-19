import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  BinaryBitmap,
  HybridBinarizer,
  QRCodeReader,
  RGBLuminanceSource,
} from "@zxing/library";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

const DEPLOYED_URL = "https://kalyanidhusia.github.io/WayPoint/";

describe("WayPoint QR asset", () => {
  it("decodes to the exact deployed demonstration URL", async () => {
    const assetPath = path.join(process.cwd(), "public", "waypoint-qr.svg");
    const svg = await readFile(assetPath);
    const { data, info } = await sharp(svg)
      .resize(512, 512)
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const source = new RGBLuminanceSource(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
    );
    const bitmap = new BinaryBitmap(new HybridBinarizer(source));
    const decoded = new QRCodeReader().decode(bitmap).getText();

    expect(decoded).toBe(DEPLOYED_URL);
  });
});
