// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calculateReadiness } from "@/lib/waypoint/readiness";
import { createInitialState, resetState, STORAGE_KEY } from "@/lib/waypoint/storage";
import { CompanionShell } from "./companion-shell";

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, String(value)); }
}

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: new MemoryStorage(),
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function createPersistedState() {
  const state = createInitialState();
  state.courseStatus = {
    osha30: "completed",
    "li-health": "completed",
    "li-safety": "completed",
    coursera: "completed",
  };
  state.mentorRequests = [{
    mentorId: "daniel",
    type: "intro",
    goal: "First safety role",
    status: "pending",
    createdAt: "2026-07-18",
  }];
  return state;
}

describe("companion hydration", () => {
  it("server rendering starts at 35 without reading browser storage", () => {
    const getItem = vi.spyOn(window.localStorage, "getItem");
    const markup = renderToString(<CompanionShell />);

    expect(markup).toContain("35%");
    expect(markup).toContain("Restoring progress");
    expect(markup).not.toContain("suppressHydrationWarning");
    expect(getItem).not.toHaveBeenCalled();
  });

  it("restores persisted readiness in the header after mount", async () => {
    const persisted = createPersistedState();
    expect(calculateReadiness(persisted)).toBe(57);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));

    render(<CompanionShell />);

    expect(await screen.findByText("57%")).toBeTruthy();
    expect(screen.queryByText("Restoring progress…")).toBeNull();
  });

  it("does not overwrite stored progress before restoring it", async () => {
    const persisted = createPersistedState();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    const setItem = vi.spyOn(window.localStorage, "setItem");

    render(<CompanionShell />);
    await screen.findByText("57%");
    await waitFor(() => expect(setItem).toHaveBeenCalled());

    const firstPersistedValue = String(setItem.mock.calls[0][1]);
    expect(calculateReadiness(JSON.parse(firstPersistedValue))).toBe(57);
  });

  it("falls back to 35 for invalid JSON and stale schema versions", async () => {
    window.localStorage.setItem(STORAGE_KEY, "{invalid");
    const first = render(<CompanionShell />);
    await waitFor(() => expect(screen.queryByText("Restoring progress…")).toBeNull());
    expect(screen.getAllByText("35%").length).toBeGreaterThan(0);
    first.unmount();

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2 }));
    render(<CompanionShell />);
    await waitFor(() => expect(screen.queryByText("Restoring progress…")).toBeNull());
    expect(screen.getAllByText("35%").length).toBeGreaterThan(0);
  });

  it("keeps readiness deterministic and reset returns it to 35", () => {
    const initial = createInitialState();
    expect(calculateReadiness(initial)).toBe(35);
    expect(calculateReadiness(createInitialState())).toBe(calculateReadiness(createInitialState()));
    expect(calculateReadiness(resetState())).toBe(35);
  });
});
