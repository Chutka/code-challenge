import Phaser from "phaser";

import { Ground } from "./Ground";
import { GAME_MATRIX } from "./Game2.types";
import { Wall } from "./Wall";
import { Player } from "./Player";
import { Book } from "./Book";

export class Game2 extends Phaser.Scene {
  private matrix = GAME_MATRIX;
  private ground = new Ground(this);
  private wall = new Wall(this);
  private book = new Book(this);
  private player = new Player(this);

  private score = 0;

  preload() {
    this.ground.load();
    this.wall.load();
    this.book.load();
    this.player.load();
  }

  create() {
    this.ground.create(this.matrix);
    this.wall.create(this.matrix);
    this.book.create(this.matrix);
    this.player.create();

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
  }

  private collectBook: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (
    _,
    book,
  ) => {
    book.destroy();
    this.score += 100;
  };
}
