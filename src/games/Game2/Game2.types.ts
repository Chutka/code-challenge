export type GameObject = "-" | "b" | "w" | "g";

export const GAME_TILE_SIZE = 16;
export const GAME_HEIGHT = 600;
export const GAME_WIDTH = 800;

const _: GameObject = "-";
const w: GameObject = "w";
const g: GameObject = "g";
const s: GameObject[] = ["g", "b"];

// prettier-ignore
export const GAME_MATRIX: (GameObject | GameObject[])[][] = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, g, g, g, w, _, _, _, _, _, _, _, _, _, w, w, w, g, g, g, w, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, g, g, g, w, _, _, _, _, _, w, w, w, w, w, g, g, g, g, s, w, g, g, g, g, g, g, g, g, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, g, g, g, w, w, w, _, _, _, w, g, g, w, w, g, g, g, g, g, w, g, g, g, g, g, g, g, g, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, g, g, g, g, g, w, w, _, _, w, g, g, g, g, g, g, g, w, w, w, s, g, g, g, g, g, g, g, g, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, g, g, g, g, g, g, w, _, _, w, g, g, g, g, g, w, w, w, w, w, g, g, g, w, w, w, g, g, g, g, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, w, g, g, g, g, g, g, w, w, w, w, g, g, w, g, g, w, g, g, w, w, w, w, w, w, g, w, g, g, g, g, g, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, g, g, g, g, w, g, g, g, g, g, g, g, g, w, g, g, w, s, g, w, g, g, g, w, g, g, g, g, g, g, g, g, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, g, g, g, w, w, g, g, g, g, g, g, g, g, w, g, g, g, g, g, w, g, g, s, w, g, g, g, g, g, g, g, g, w, g, s, w, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, g, g, g, w, g, g, g, g, g, g, g, g, g, w, w, g, g, g, g, w, g, g, g, w, g, s, g, g, w, g, g, g, w, g, g, w, w, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, g, g, w, w, g, g, g, w, g, g, w, g, g, g, g, g, g, w, w, w, g, g, w, w, g, g, g, g, w, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, _, _, _],
  [_, _, w, g, g, w, g, g, g, g, w, g, g, w, g, g, g, g, g, g, w, g, g, g, g, g, g, g, g, w, w, w, w, w, g, g, g, g, g, g, g, g, g, g, s, g, w, _, _, _],
  [_, _, w, s, w, w, g, g, w, w, w, g, g, w, w, g, g, g, g, g, w, g, g, g, g, g, g, g, g, w, g, g, g, w, g, g, g, g, g, g, g, g, g, g, g, g, w, _, _, _],
  [_, _, w, w, w, g, g, g, w, s, w, g, g, g, w, g, g, g, g, g, g, g, g, g, w, g, g, g, g, w, g, g, g, w, g, g, g, w, g, g, g, g, g, g, g, g, w, _, _, _],
  [_, _, _, w, g, g, g, w, w, g, w, g, g, g, w, w, g, g, g, g, g, g, g, g, w, w, w, g, g, g, g, g, g, w, g, g, g, w, g, g, w, g, g, g, g, g, w, _, _, _],
  [_, _, _, w, g, g, g, w, g, g, w, w, g, g, g, w, w, w, g, g, g, g, w, w, w, g, g, g, g, g, g, g, g, w, g, g, g, w, g, g, w, w, w, w, w, w, w, _, _, _],
  [_, _, _, w, g, g, g, w, g, g, g, w, g, g, g, g, g, w, g, w, g, g, g, g, w, g, g, g, g, g, g, g, g, g, g, g, w, w, g, g, w, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, g, g, g, g, g, g, g, w, w, w, g, g, g, w, w, w, g, g, g, g, w, g, g, w, g, g, w, w, g, g, g, g, w, g, g, g, w, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, g, g, g, g, g, w, g, w, g, w, g, g, g, g, g, g, g, g, s, g, g, g, g, w, g, g, g, w, g, g, g, w, w, s, g, w, w, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, w, s, g, g, g, w, g, w, g, w, w, g, g, g, g, g, g, g, g, g, g, g, g, w, g, g, g, w, w, g, g, g, w, g, w, w, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, w, g, w, w, g, g, w, w, g, g, w, w, g, g, g, g, g, g, g, g, g, g, g, w, w, g, g, g, w, g, g, g, w, w, w, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, w, w, w, g, g, g, g, g, g, g, s, w, w, w, w, g, g, w, w, w, w, w, g, g, w, g, g, g, w, g, s, g, w, w, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, w, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, g, s, g, w, g, g, w, w, g, g, w, g, g, g, w, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, w, g, g, g, g, w, g, g, g, g, g, g, g, g, g, g, w, g, g, g, w, g, g, g, w, g, g, w, g, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, w, w, g, g, g, g, w, w, w, w, g, g, w, w, w, g, g, w, w, g, g, w, w, g, g, g, g, g, w, g, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, w, g, g, g, g, w, w, w, g, g, w, g, g, w, g, w, g, g, g, w, w, g, g, w, g, g, g, g, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, w, g, g, g, g, w, _, _, _, w, w, g, g, w, _, w, g, g, g, g, w, g, g, g, g, g, g, g, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, g, g, g, g, g, w, _, _, _, w, g, g, w, w, _, w, w, g, g, g, w, g, g, g, g, g, g, g, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, g, g, g, w, w, w, _, _, _, w, g, s, w, _, _, _, w, g, g, s, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, g, s, g, w, _, _, _, _, _, w, g, g, w, _, _, _, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, g, g, g, w, _, _, _, _, _, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];
