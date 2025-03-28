import Phaser from "phaser";
import ground1 from "../assets/grounds/ground1.png";
import ground2 from "../assets/grounds/ground2.png";
import ground3 from "../assets/grounds/ground3.png";
import ground4 from "../assets/grounds/ground4.png";
import ground5 from "../assets/grounds/ground5.png";
import ground6 from "../assets/grounds/ground6.png";
import ground7 from "../assets/grounds/ground7.png";
import ground8 from "../assets/grounds/ground8.png";
import ground9 from "../assets/grounds/ground9.png";
import ground10 from "../assets/grounds/ground10.png";
import ground11 from "../assets/grounds/ground11.png";
import ground12 from "../assets/grounds/ground12.png";
import ground13 from "../assets/grounds/ground13.png";
import ground14 from "../assets/grounds/ground14.png";
import ground15 from "../assets/grounds/ground15.png";
import ground16 from "../assets/grounds/ground16.png";
import ground17 from "../assets/grounds/ground17.png";
import ground18 from "../assets/grounds/ground18.png";
import ground19 from "../assets/grounds/ground19.png";
import ground20 from "../assets/grounds/ground20.png";
import { GAME_TILE_SIZE, GameObject } from "../Game2.types";

export class Ground {
  constructor(private scene: Phaser.Scene) {}

  load() {
    this.scene.load.image("ground1", ground1);
    this.scene.load.image("ground2", ground2);
    this.scene.load.image("ground3", ground3);
    this.scene.load.image("ground4", ground4);
    this.scene.load.image("ground5", ground5);
    this.scene.load.image("ground6", ground6);
    this.scene.load.image("ground7", ground7);
    this.scene.load.image("ground8", ground8);
    this.scene.load.image("ground9", ground9);
    this.scene.load.image("ground10", ground10);
    this.scene.load.image("ground11", ground11);
    this.scene.load.image("ground12", ground12);
    this.scene.load.image("ground13", ground13);
    this.scene.load.image("ground14", ground14);
    this.scene.load.image("ground15", ground15);
    this.scene.load.image("ground16", ground16);
    this.scene.load.image("ground17", ground17);
    this.scene.load.image("ground18", ground18);
    this.scene.load.image("ground19", ground19);
    this.scene.load.image("ground20", ground20);
  }

  create(matrix: (GameObject | GameObject[])[][]) {
    for (let vI = 0; vI < matrix.length; vI++) {
      for (let hI = 0; hI < matrix[vI].length; hI++) {
        const cell = Array.isArray(matrix[vI][hI])
          ? matrix[vI][hI]
          : [matrix[vI][hI]];
        if (!cell.includes("g")) continue;

        const item = Math.ceil(Math.random() * 20);
        this.scene.add.image(
          hI * GAME_TILE_SIZE + GAME_TILE_SIZE / 2,
          vI * GAME_TILE_SIZE + GAME_TILE_SIZE / 2,
          `ground${item}`,
        );
      }
    }
  }
}
