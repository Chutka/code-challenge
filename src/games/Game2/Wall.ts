import Phaser from "phaser";
import wall1 from "./assets/walls/wall_1.png";
import wall2 from "./assets/walls/wall_2.png";
import wall3 from "./assets/walls/wall_3.png";
import wall4 from "./assets/walls/wall_4.png";
import wall5 from "./assets/walls/wall_5.png";
import wall6 from "./assets/walls/wall_6.png";
import wall7 from "./assets/walls/wall_7.png";
import wall8 from "./assets/walls/wall_8.png";
import wall9 from "./assets/walls/wall_9.png";
import wall10 from "./assets/walls/wall_10.png";
import wall11 from "./assets/walls/wall_11.png";
import wall12 from "./assets/walls/wall_12.png";
import wall13 from "./assets/walls/wall_13.png";
import wall14 from "./assets/walls/wall_14.png";
import wall15 from "./assets/walls/wall_15.png";
import wall16 from "./assets/walls/wall_16.png";
import wall17 from "./assets/walls/wall_17.png";
import wall18 from "./assets/walls/wall_18.png";
import wallB1 from "./assets/walls/wall_b_1.png";
import wallB2 from "./assets/walls/wall_b_2.png";
import wallB3 from "./assets/walls/wall_b_3.png";
import wallB4 from "./assets/walls/wall_b_4.png";
import wallB5 from "./assets/walls/wall_b_5.png";
import wallB6 from "./assets/walls/wall_b_6.png";
import wallB7 from "./assets/walls/wall_b_7.png";
import wallB8 from "./assets/walls/wall_b_8.png";
import wallB9 from "./assets/walls/wall_b_9.png";
import wallB10 from "./assets/walls/wall_b_10.png";
import wallB11 from "./assets/walls/wall_b_11.png";
import wallB12 from "./assets/walls/wall_b_12.png";
import wallB13 from "./assets/walls/wall_b_13.png";
import wallB14 from "./assets/walls/wall_b_14.png";
import wallB15 from "./assets/walls/wall_b_15.png";
import wallB16 from "./assets/walls/wall_b_16.png";
import wallB17 from "./assets/walls/wall_b_17.png";
import wallB18 from "./assets/walls/wall_b_18.png";
import wallB19 from "./assets/walls/wall_b_19.png";
import wallB20 from "./assets/walls/wall_b_20.png";
import { GAME_TILE_SIZE, GameObject } from "./Game2.types";

export class Wall {
  walls?: Phaser.Physics.Arcade.StaticGroup;

  constructor(private scene: Phaser.Scene) {}

  load() {
    this.scene.load.image("wall1", wall1);
    this.scene.load.image("wall2", wall2);
    this.scene.load.image("wall3", wall3);
    this.scene.load.image("wall4", wall4);
    this.scene.load.image("wall5", wall5);
    this.scene.load.image("wall6", wall6);
    this.scene.load.image("wall7", wall7);
    this.scene.load.image("wall8", wall8);
    this.scene.load.image("wall9", wall9);
    this.scene.load.image("wall10", wall10);
    this.scene.load.image("wall11", wall11);
    this.scene.load.image("wall12", wall12);
    this.scene.load.image("wall13", wall13);
    this.scene.load.image("wall14", wall14);
    this.scene.load.image("wall15", wall15);
    this.scene.load.image("wall16", wall16);
    this.scene.load.image("wall17", wall17);
    this.scene.load.image("wall18", wall18);

    this.scene.load.image("wallB1", wallB1);
    this.scene.load.image("wallB2", wallB2);
    this.scene.load.image("wallB3", wallB3);
    this.scene.load.image("wallB4", wallB4);
    this.scene.load.image("wallB5", wallB5);
    this.scene.load.image("wallB6", wallB6);
    this.scene.load.image("wallB7", wallB7);
    this.scene.load.image("wallB8", wallB8);
    this.scene.load.image("wallB9", wallB9);
    this.scene.load.image("wallB10", wallB10);
    this.scene.load.image("wallB11", wallB11);
    this.scene.load.image("wallB12", wallB12);
    this.scene.load.image("wallB13", wallB13);
    this.scene.load.image("wallB14", wallB14);
    this.scene.load.image("wallB15", wallB15);
    this.scene.load.image("wallB16", wallB16);
    this.scene.load.image("wallB17", wallB17);
    this.scene.load.image("wallB18", wallB18);
    this.scene.load.image("wallB19", wallB19);
    this.scene.load.image("wallB20", wallB20);
  }

  create(matrix: (GameObject | GameObject[])[][]) {
    this.walls = this.scene.physics.add.staticGroup();

    for (let vI = 0; vI < matrix.length; vI++) {
      for (let hI = 0; hI < matrix[vI].length; hI++) {
        if (matrix[vI][hI] !== "w") continue;
        const isBottomWExist = matrix[vI + 1]?.[hI] === "w";

        let wallKey: string;

        if (isBottomWExist) {
          const item = Math.ceil(Math.random() * 18);
          wallKey = `wall${item}`;
        } else {
          const item = Math.ceil(Math.random() * 20);
          wallKey = `wallB${item}`;
        }
        this.walls.create(
          hI * GAME_TILE_SIZE + GAME_TILE_SIZE / 2,
          vI * GAME_TILE_SIZE + GAME_TILE_SIZE / 2,
          wallKey,
        );
      }
    }
  }
}
