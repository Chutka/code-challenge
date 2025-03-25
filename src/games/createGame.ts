import Phaser from "phaser";

export function createGame(initConfig: Partial<Phaser.Types.Core.GameConfig>) {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
      mode: Phaser.Scale.FIT,
      width: 800,
      height: 600,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 300 },
        debug: false,
      },
    },
    ...initConfig,
  };

  return new Phaser.Game(config);
}
