import Phaser from "phaser";

export class Score {
  private score?: Phaser.GameObjects.Text;
  private scoreValue = 0;

  constructor(private scene: Phaser.Scene) {}

  create() {
    this.scoreValue = 0;
    this.score = this.scene.add.text(700, 20, "", {
      fontSize: "14px",
      color: "#ffffff",
    });
    this.updateScore(0);
  }

  updateScore(value: number) {
    this.scoreValue += value;
    this.score?.setText(`Счëт: ${this.scoreValue}`);
  }
}
