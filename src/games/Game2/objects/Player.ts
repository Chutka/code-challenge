import Phaser from "phaser";

import player1 from "../assets/player/player_1.png";

export class Player {
  private DEFAULT_X = 88;
  private DEFAULT_Y = 72;
  private playerKey = "player";
  private leftKey = "left";
  private rightKey = "right";
  private downKey = "down";
  private upKey = "up";

  player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(private scene: Phaser.Scene) {}

  load() {
    this.scene.load.spritesheet(this.playerKey, player1, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.player = this.scene.physics.add.sprite(this.DEFAULT_X, this.DEFAULT_Y, this.playerKey);
    this.player.setSize(12, 12);
    this.player.setBounce(0, 0);
    this.player.setCollideWorldBounds(true);
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

  setVelocity(x: number, y: number) {
    this.player?.setVelocity(x, y);
  }

  update() {
    if (this.cursor?.left.isDown) {
      this.player?.setFlipX(false);
      this.player?.setVelocity(-100, 0);
      this.player?.anims.play(this.leftKey, true);
      return;
    }
    if (this.cursor?.right.isDown) {
      this.player?.setFlipX(true);
      this.player?.setVelocity(100, 0);
      this.player?.anims.play(this.rightKey, true);
      return;
    }
    if (this.cursor?.up.isDown) {
      this.player?.setVelocity(0, -100);
      this.player?.anims.play(this.upKey, true);
      return;
    }
    if (this.cursor?.down.isDown) {
      this.player?.setVelocity(0, 100);
      this.player?.anims.play(this.downKey, true);
      return;
    }

    // No key held: let coded actions drive velocity, but still pick the
    // matching animation so the sprite walks instead of T-posing.
    const body = this.player?.body;
    if (!body) return;
    const { x: vx, y: vy } = body.velocity;
    if (vx === 0 && vy === 0) {
      this.player?.anims.stop();
      return;
    }
    if (Math.abs(vx) >= Math.abs(vy)) {
      this.player?.setFlipX(vx > 0);
      this.player?.anims.play(vx < 0 ? this.leftKey : this.rightKey, true);
    } else {
      this.player?.anims.play(vy < 0 ? this.upKey : this.downKey, true);
    }
  }

  reset() {
    this.player?.setPosition(this.DEFAULT_X, this.DEFAULT_Y);
    this.player?.setVelocity(0);
  }
}
