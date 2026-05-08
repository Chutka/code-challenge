export type GameObject = "-" | "b" | "w" | "g";

export const GAME_TILE_SIZE = 16;
export const GAME_HEIGHT = 600;
export const GAME_WIDTH = 800;

const MAP_WIDTH = 50;
const MAP_HEIGHT = 37;

const ROOM = {
  top: 2,
  bottom: 30,
  left: 3,
  right: 46,
};

const BOOK_TILES: Array<[number, number]> = [
  [10, 4],
  [20, 4],
  [10, 12],
  [20, 12],
];

export const GAME_MATRIX: (GameObject | GameObject[])[][] = (() => {
  const bookSet = new Set(BOOK_TILES.map(([x, y]) => `${x},${y}`));
  const grid: (GameObject | GameObject[])[][] = [];
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const row: (GameObject | GameObject[])[] = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      const onHWall =
        (y === ROOM.top || y === ROOM.bottom) &&
        x >= ROOM.left &&
        x <= ROOM.right;
      const onVWall =
        (x === ROOM.left || x === ROOM.right) &&
        y >= ROOM.top &&
        y <= ROOM.bottom;
      const inInterior =
        x > ROOM.left &&
        x < ROOM.right &&
        y > ROOM.top &&
        y < ROOM.bottom;

      if (onHWall || onVWall) {
        row.push("w");
      } else if (inInterior && bookSet.has(`${x},${y}`)) {
        row.push(["g", "b"]);
      } else if (inInterior) {
        row.push("g");
      } else {
        row.push("-");
      }
    }
    grid.push(row);
  }
  return grid;
})();

export enum ActionEnum {
  MOVE_X,
  MOVE_Y,
}

export interface BaseAction {
  type: ActionEnum;
}

export interface MoveXAction extends BaseAction {
  type: ActionEnum.MOVE_X;
  x: number;
}

export interface MoveYAction extends BaseAction {
  type: ActionEnum.MOVE_Y;
  y: number;
}
