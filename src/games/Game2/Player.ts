import Phaser from "phaser";

import player1 from "./assets/player/player_1.png";

export class Player {
  private playerKey = "player";
  private leftKey = "left";
  private rightKey = "right";
  private downKey = "down";
  private upKey = "up";

  private player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(private scene: Phaser.Scene) {}

  load() {
    this.scene.load.spritesheet(this.playerKey, player1, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.player = this.scene.physics.add.sprite(85, 70, this.playerKey);
    this.cursor = this.scene.input.keyboard?.createCursorKeys();

    this.scene.anims.create({
      key: this.leftKey,
      frames: this.scene.anims.generateFrameNumbers(this.playerKey, {
        start: 16,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: this.rightKey,
      frames: this.scene.anims.generateFrameNumbers(this.playerKey, {
        start: 16,
        end: 19,
      }),
      frameRate: 10,
      repeat: 1,
    });
    this.scene.anims.create({
      key: this.upKey,
      frames: this.scene.anims.generateFrameNumbers(this.playerKey, {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: this.downKey,
      frames: this.scene.anims.generateFrameNumbers(this.playerKey, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (this.cursor?.left.isDown) {
      if (this.player?.flipX) {
        this.player?.setFlipX(false);
      }
      this.player?.setVelocity(-100, 0);
      this.player?.anims.play(this.leftKey, true);
    } else if (this.cursor?.right.isDown) {
      this.player?.setFlipX(true);
      this.player?.setVelocity(100, 0);
      this.player?.anims.play(this.rightKey, true);
    } else if (this.cursor?.up.isDown) {
      this.player?.setVelocity(0, -100);
      this.player?.anims.play(this.upKey, true);
    } else if (this.cursor?.down.isDown) {
      this.player?.setVelocity(0, 100);
      this.player?.anims.play(this.downKey, true);
    } else {
      this.player?.setVelocity(0, 0);
    }
  }
}
