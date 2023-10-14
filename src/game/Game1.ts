import Phaser from "phaser";
import skySrc from '../assets/game/sky.png';
import starSrc from '../assets/game/star.png';
import platformSrc from '../assets/game/platform.png';
import bombSrc from '../assets/game/bomb.png';
import dudeSrc from '../assets/game/dude.png';

console.log(skySrc, starSrc);

export enum ActionEnum {
  MOVE,
  JUMP,
  WAIT,
  RESET,
}

export interface BaseAction {
  type: ActionEnum;
}

export interface MoveAction extends BaseAction {
  type: ActionEnum.MOVE;
  velocity: number;
}

export interface JumpAction extends BaseAction {
  type: ActionEnum.JUMP,
  velocity: number,
}

export interface WaitAction extends BaseAction {
  type: ActionEnum.WAIT,
  ms: number,
}

export interface ResetAction extends BaseAction {
  type: ActionEnum.RESET,
}

export class Game1 extends Phaser.Scene {
    scoreText?: Phaser.GameObjects.Text;
    gameOver = false;
    score = 0;
    platforms?: Phaser.Types.Physics.Arcade.ArcadeColliderType;
    bombs?: Phaser.Types.Physics.Arcade.ArcadeColliderType;
    stars?: Phaser.Physics.Arcade.Group;
    starsCollider?: Phaser.Physics.Arcade.Collider;
    starsOverlap?: Phaser.Physics.Arcade.Collider;
    player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    actionsQueue: BaseAction[] = [];
    lastAction?: BaseAction;
    waitStart?: number;
    finishCallback?: () => void;

    preload () {
      this.load.image('sky', skySrc);
      this.load.image('ground', platformSrc);
      this.load.image('star', starSrc);
      this.load.image('bomb', bombSrc);
      this.load.spritesheet('dude', dudeSrc, { frameWidth: 32, frameHeight: 48 });
    }

    create () {
      //  A simple background for our game
      this.add.image(400, 300, 'sky');

      //  The platforms group contains the ground and the 2 ledges we can jump on
      this.platforms = this.physics.add.staticGroup();

      //  Here we create the ground.
      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      //  Now let's create some ledges
      this.platforms.create(600, 400, 'ground');
      this.platforms.create(50, 250, 'ground');
      this.platforms.create(750, 220, 'ground');

      // The player and its settings
      this.player = this.physics.add.sprite(100, 450, 'dude');

      //  Player physics properties. Give the little guy a slight bounce.
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      //  Our player animations, turning, walking left and walking right.
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
      this.physics.add.collider(this.player, this.platforms);
      this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' });
      this.reset();
    }

    addAction = (action: BaseAction) => {
      this.actionsQueue.push(action);
    }

    onFinish(callback: () => void) {
      this.finishCallback = callback;
    }

    private move(velocity: number): boolean {
      if (this.gameOver) {
        return true;
      }
      if (Math.abs(velocity) > 400) {
        return true;
      }
      this.player?.setVelocityX(velocity);
      if (velocity < 0) {
        this.player?.anims.play('left', true);
      } else if (velocity > 0) {
        this.player?.anims.play('right', true);
      } else {
        this.player?.anims.play('turn');
      }
      return true;
    }

    private jump(velocity: number): boolean {
      if (!this.player?.body.touching.down) {
        return false;
      }

      this.player?.setVelocityY(-Math.abs(velocity));

      return true;
    }
    
    private wait(ms: number): boolean {
      if (!this.waitStart) {
        this.waitStart = Date.now();
      }
      if ((Date.now() - this.waitStart) < ms) {
        return false;
      }
      this.waitStart = undefined;
      return true;
    }

    runAction(action: BaseAction) {
      switch(action.type) {
        case ActionEnum.MOVE:
          return this.move((action as MoveAction).velocity);
        case ActionEnum.JUMP:
          return this.jump((action as JumpAction).velocity);
        case ActionEnum.WAIT:
          return this.wait((action as WaitAction).ms);
        case ActionEnum.RESET:
          return this.reset();
      }
    }

    update () {
      if (this.gameOver) {
          return;
      }

      if (this.lastAction && !this.runAction(this.lastAction)) {
        return;
      }

      this.lastAction = this.actionsQueue.shift();
    }

    collectStar: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback =  (_, star) => {
        star.destroy(true);

        //  Add and update the score
        this.score += 1;
        this.scoreText?.setText(`Score: ${this.score}`);

        if (this.stars?.countActive(true) === 0) {
          this.physics?.pause();
          this.actionsQueue = [];
          this.finishCallback?.();
          this.reset();
        }
    }

    hitBomb: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = () =>  {
        this.physics.pause();
        this.gameOver = true;
    }

    private reset() {
      this.resetScore();
      this.resetPlayer();
      this.resetStarts();
      return true;
    }

    private resetPlayer() {
      this.player?.setPosition(400, this.player.body.position.y);
      this.player?.setVelocity(0);
      this.player?.anims.play('turn');
    }

    private resetScore() {
      this.score = 0;
      this.scoreText?.setText(`Score: ${this.score}`);
    }

    private resetStarts() {
      this.starsCollider?.destroy();
      this.starsOverlap?.destroy();
      this.stars?.destroy(true);
      this.stars = this.physics.add.group({
        key: 'star',
        repeat: 10,
        setXY: { x: 12, y: 0, stepX: 70 },
        bounceY: Phaser.Math.FloatBetween(0.1, 0.3),
      });
      this.starsCollider = this.physics.add.collider(this.stars, this.platforms!);
      this.starsOverlap = this.physics.add.overlap(this.player!, this.stars, this.collectStar, undefined, this);
    }
}