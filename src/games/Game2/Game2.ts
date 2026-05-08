import Phaser from "phaser";

import {
  ActionEnum,
  BaseAction,
  GAME_MATRIX,
  GAME_TILE_SIZE,
  MoveXAction,
  MoveYAction,
} from "./Game2.types";
import { Wall } from "./objects/Wall";
import { Player } from "./objects/Player";
import { Book } from "./objects/Book";
import { Score } from "./objects/Score";
import { Ground } from "./objects/Ground";

interface CurrentAction {
  start: number;
  duration: number;
  action: BaseAction;
}

const PLAYER_SPEED = 100;

export class Game2 extends Phaser.Scene {
  private ground = new Ground(this, GAME_MATRIX);
  private wall = new Wall(this, GAME_MATRIX);
  private book = new Book(this, GAME_MATRIX);
  private player = new Player(this);
  private score = new Score(this);

  private finished = false;
  private won = false;
  private action?: CurrentAction;
  private queue: BaseAction[] = [];
  private finishCallback?: () => void;

  preload() {
    this.ground.load();
    this.wall.load();
    this.book.load();
    this.player.load();
  }

  create() {
    this.ground.create();
    this.wall.create();
    this.book.create();
    this.player.create();
    this.score.create();

    this.physics.add.collider(this.wall.walls!, this.player.player!);
    this.physics.add.overlap(
      this.player.player!,
      this.book.books!,
      this.collectBook,
      undefined,
    );
  }

  update() {
    this.player.update();
    if (this.finished) return;

    if (this.action) {
      const { start, duration } = this.action;
      if (start + duration <= Date.now()) {
        this.action = undefined;
        this.player.player?.setVelocity(0, 0);
      }
    }

    if (this.action) return;

    const action = this.queue.shift();
    if (!action) {
      this.finished = true;
      return;
    }

    const playerSprite = this.player.player;
    if (!playerSprite) return;

    let { x, y } = playerSprite;
    let steps = 0;

    switch (action.type) {
      case ActionEnum.MOVE_X:
        steps = (action as MoveXAction).x;
        x += steps * GAME_TILE_SIZE;
        break;
      case ActionEnum.MOVE_Y:
        steps = (action as MoveYAction).y;
        y += steps * GAME_TILE_SIZE;
        break;
    }

    const distancePx = Math.abs(steps) * GAME_TILE_SIZE;
    this.action = {
      start: Date.now(),
      duration: (distancePx / PLAYER_SPEED) * 1000,
      action,
    };
    this.physics.moveTo(playerSprite, x, y, PLAYER_SPEED);
  }

  reset() {
    this.book.reset();
    this.player.reset();
    this.score.reset();
    this.queue = [];
    this.action = undefined;
    this.finished = false;
    this.won = false;
  }

  addAction(action: BaseAction) {
    this.queue.push(action);
    this.finished = false;
  }

  onFinish(callback: () => void) {
    this.finishCallback = callback;
  }

  private collectBook: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (
    _,
    book,
  ) => {
    book.destroy();
    this.score.updateScore(100);

    if (!this.won && this.book.books?.countActive(true) === 0) {
      this.won = true;
      this.finishCallback?.();
    }
  };
}
