import type { Metadata } from "next";
import { PitchDeck } from "./pitch-deck";

export const metadata: Metadata = {
  title: "WayPoint Judge Pitch",
  description: "A two-minute judge presentation for the WayPoint career companion.",
};

export default function PitchPage() {
  return <PitchDeck assetBasePath={process.env.PAGES_BASE_PATH ?? ""} />;
}
