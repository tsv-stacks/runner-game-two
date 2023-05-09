import playerAnimations from "./player/playerAnimations.js";
import InputHandler from "./Scripts/InputHandler.js";
import { displayStatusText, liveHearts } from "./Scripts/HUD.js";
import { clamp, randomEnemyInterval } from "./Scripts/HelperFunctions.js";
import {
  backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  Background,
} from "./Scripts/Background.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

  let enemies = [];
  let playerLives = 3;
  let score = 0;
  let gameOver = false;

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameHeight = gameHeight;
      this.gameWidth = gameWidth;
      this.width = 48;
      this.height = 48;
      this.scaleWidth = this.width * 2;
      this.scaleHeight = this.height * 2;
      this.x = 10;
      this.y = this.gameHeight - this.scaleHeight;

      this.playerAnimations = playerAnimations;
      this.frameX = 0;
      this.speed = 0;
      this.currentAnimation = "walk";
      this.maxFrames = 8;
      this.donorWidth = 48;
      this.donorHeight = 48;

      this.vy = 0;
      this.gravity = 1;
      this.jumpPower = 25;
      this.maxJumpCount = 2;
      this.jumpCount = 0;

      this.tickCount = 0;
      this.ticksPerFrame = 5;
    }

    draw(context) {
      const animation = this.playerAnimations.find(
        (anim) => anim.animation === this.currentAnimation
      );
      const image = animation.image;
      const frames = animation.frames;
      const frameWidth = image.width / frames;
      const frameHeight = image.height;
      context.drawImage(
        image,
        this.frameX * frameWidth,
        0,
        frameWidth,
        frameHeight,
        this.x,
        this.y - 30,
        this.scaleWidth,
        this.scaleHeight
      );
    }

    update(input, enemies) {
      // collision detection
      enemies.forEach((enemy) => {
        if (enemy.collision) {
          return console.log("cooldown");
        }

        const circle = {
          x: enemy.x + 110,
          y: enemy.y + 30,
          r: 24 * 1.6,
        };
        const rect = {
          x: this.x + 30,
          y: this.y - 6,
          w: this.scaleWidth - 60,
          h: this.scaleHeight - 40,
        };

        // Find the closest point to the circle within the rectangle
        let closestX = clamp(circle.x, rect.x, rect.x + rect.w);
        let closestY = clamp(circle.y, rect.y, rect.y + rect.h);

        // Calculate the distance between the circle's center and the closest point
        let distanceX = circle.x - closestX;
        let distanceY = circle.y - closestY;
        let distanceSquared = distanceX * distanceX + distanceY * distanceY;

        // Check if the distance is less than the circle's radius
        if (distanceSquared < circle.r * circle.r) {
          console.log("Collision detected!");
          enemy.collision = true;
          playerLives--;
        }
      });

      // Sprite Animation
      if (input.keys.indexOf("ArrowDown") > -1 && this.vy === 0) {
        this.currentAnimation = "roll";
      } else if (this.vy < 0) {
        console.log("jump up");
        this.currentAnimation = "run";
      } else if (this.vy > 0) {
        console.log("fall");
        this.currentAnimation = "run";
      } else if (this.speed !== 0) {
        console.log("running");
        this.currentAnimation = "run";
      } else {
        this.currentAnimation = "walk";
      }

      const animation = playerAnimations.find(
        (animation) => animation.animation === this.currentAnimation
      );

      this.tickCount++;

      if (this.tickCount >= this.ticksPerFrame) {
        this.frameX++;
        this.tickCount = 0;
        if (this.frameX >= animation.frames) {
          score += 2;
          this.frameX = 0;
        }
      }

      // controls
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -4;
      } else {
        this.speed = 0;
      }
      //horizontal movement
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.scaleWidth)
        this.x = this.gameWidth - this.scaleWidth;
      // vertical movement
      if (
        input.keys.indexOf("ArrowUp") > -1 &&
        this.jumpCount < this.maxJumpCount
      ) {
        this.vy = -this.jumpPower;
        this.jumpCount++;
      }
      this.vy += this.gravity;
      this.y += this.vy;
      if (this.y + this.scaleHeight > this.gameHeight) {
        this.y = this.gameHeight - this.scaleHeight;
        this.vy = 0;
        this.jumpCount = 0;
      }
    }
  }

  class Enemy {
    constructor(
      gameWidth,
      gameHeight,
      image,
      imageWidth,
      imageHeight,
      scale,
      frames
    ) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = image;
      this.x = gameWidth;
      this.y = this.gameHeight - 96;
      this.imageWidth = imageWidth;
      this.imageHeight = imageHeight;
      this.scale = scale;
      this.frames = frames;
      this.frameIndex = 0;
      this.tickCount = 0;
      this.ticksPerFrame = 3;
      this.speed = Math.floor(Math.random() * 3) + 2;
      this.markedForDeletion = false;
      this.collision = false;
    }
    draw(context) {
      context.drawImage(
        this.image,
        ([this.frameIndex] * this.imageWidth) / this.frames,
        0,
        96,
        this.imageHeight,
        this.x,
        this.y - 40,
        this.imageWidth / this.scale,
        this.imageHeight * this.scale
      );
    }

    update() {
      this.x -= this.speed;
      this.tickCount++;
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        this.frameIndex++;
      }
      if (this.frameIndex >= this.frames) {
        this.frameIndex = 0;
      }
      if (this.x < 0 - this.gameWidth + this.imageWidth) {
        this.markedForDeletion = true;
        score += 100;
      }
    }
  }

  function handleEnemies(deltaTime) {
    enemyTimer += deltaTime;
    if (enemyTimer > randomEnemyInterval()) {
      enemies.push(
        new Enemy(canvas.width, canvas.height, enemyImage, 672, 32, 3, 7)
      );
      enemyTimer = 0;
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update();
    });
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion);
  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  player.draw(ctx);
  const enemyImage = new Image();
  enemyImage.src = "./Enemies/red-slime-idle.png";

  let bggamespeed = 4;

  const layer1 = new Background(
    246,
    720,
    backgroundImage1,
    0.1,
    bggamespeed,
    canvas.width
  );
  const layer2 = new Background(
    563,
    720,
    backgroundImage2,
    0.3,
    bggamespeed,
    canvas.width
  );
  const layer3 = new Background(
    1511,
    720,
    backgroundImage3,
    0.55,
    bggamespeed,
    canvas.width
  );

  let lastTime = 0;
  let enemyTimer = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (playerLives === 0) gameOver = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layer1.update();
    layer1.draw(ctx);
    layer2.update();
    layer2.draw(ctx);
    layer3.update();
    layer3.draw(ctx);
    displayStatusText(ctx, score, canvas.width, canvas.height, gameOver);
    liveHearts(ctx, playerLives);
    player.draw(ctx);
    if (!gameOver) {
      handleEnemies(deltaTime);
      player.update(input, enemies);
      requestAnimationFrame(animate);
    }
  }
  animate(0);
});
