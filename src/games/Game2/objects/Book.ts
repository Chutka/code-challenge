import Phaser from "phaser";
import book1 from "../assets/books/book_1.png";
import book2 from "../assets/books/book_2.png";
import book3 from "../assets/books/book_3.png";
import book4 from "../assets/books/book_4.png";
import { GAME_TILE_SIZE, GameObject } from "../Game2.types";

export class Book {
  books?: Phaser.Physics.Arcade.StaticGroup;

  constructor(private scene: Phaser.Scene) {}

  load() {
    this.scene.load.image("book1", book1);
    this.scene.load.image("book2", book2);
    this.scene.load.image("book3", book3);
    this.scene.load.image("book4", book4);
  }

  create(matrix: (GameObject | GameObject[])[][]) {
    this.books = this.scene.physics.add.staticGroup();

    for (let vI = 0; vI < matrix.length; vI++) {
      for (let hI = 0; hI < matrix[vI].length; hI++) {
        const cell = Array.isArray(matrix[vI][hI])
          ? matrix[vI][hI]
          : [matrix[vI][hI]];
        if (!cell.includes("b")) continue;

        const item = Math.ceil(Math.random() * 4);
        this.books.create(
          hI * GAME_TILE_SIZE + GAME_TILE_SIZE / 2,
          vI * GAME_TILE_SIZE + GAME_TILE_SIZE / 2,
          `book${item}`,
        );
      }
    }
  }
}
