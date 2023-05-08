import playerAnimations from "./player/playerAnimations.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const backgroundImage1 = new Image();
  backgroundImage1.src = "./background/city-back.png";
  const backgroundImage2 = new Image();
  backgroundImage2.src = "./background/city-middle.png";
  const backgroundImage3 = new Image();
  backgroundImage3.src = "./background/city-foreground.png";
  let enemies = [];
  let score = 0;

  canvas.width = 800;
  canvas.height = 720;

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (e) => {
        if (e.code === "ArrowRight" && !this.keys.includes("ArrowRight")) {
          this.keys.push("ArrowRight");
        }
        if (e.code === "ArrowLeft" && !this.keys.includes("ArrowLeft")) {
          this.keys.push("ArrowLeft");
        }
        if (e.code === "ArrowUp" && !this.keys.includes("ArrowUp")) {
          this.keys.push("ArrowUp");
        }
        if (e.code === "ArrowDown" && !this.keys.includes("ArrowDown")) {
          this.keys.push("ArrowDown");
        }
      });

      window.addEventListener("keyup", (e) => {
        if (e.code === "ArrowRight" && this.keys.includes("ArrowRight")) {
          this.keys.splice(this.keys.indexOf("ArrowRight"), 1);
        }
        if (e.code === "ArrowLeft" && this.keys.includes("ArrowLeft")) {
          this.keys.splice(this.keys.indexOf("ArrowLeft"), 1);
        }
        if (e.code === "ArrowUp" && this.keys.includes("ArrowUp")) {
          this.keys.splice(this.keys.indexOf("ArrowUp"), 1);
        }
        if (e.code === "ArrowDown" && this.keys.includes("ArrowDown")) {
          this.keys.splice(this.keys.indexOf("ArrowDown"), 1);
        }
      });
    }
  }

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

    update(input) {
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
        console.log("walk");
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
          this.frameX = 0;
        }
      }

      // controls
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 4;
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

  let bggamespeed = 4;

  class Background {
    constructor(imageWidth, imageHeight, image, speedModifier) {
      this.imageHeight = imageHeight;
      this.imageWidth = imageWidth;
      this.image = image;
      this.speedModifier = speedModifier;
      this.x = 0;
      this.y = 0;
      this.speed = bggamespeed * this.speedModifier;
      this.numImages = Math.ceil(canvas.width / this.imageWidth) + 1;
    }
    update() {
      this.speed = bggamespeed * this.speedModifier;
      if (this.x <= -this.imageWidth) {
        this.x += this.imageWidth;
      }
      this.x = Math.floor(this.x - this.speed);
      this.draw();
    }
    draw() {
      for (let i = 0; i < this.numImages; i++) {
        ctx.drawImage(
          this.image,
          this.x + i * this.imageWidth,
          this.y,
          this.imageWidth,
          this.imageHeight
        );
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
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true;
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

  function displayStatusText() {}

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  player.draw(ctx);
  const enemyImage = new Image();
  enemyImage.src = "./Enemies/red-slime-idle.png";

  const layer1 = new Background(246, 720, backgroundImage1, 0.1);
  const layer2 = new Background(563, 720, backgroundImage2, 0.3);
  const layer3 = new Background(1511, 720, backgroundImage3, 0.55);

  let lastTime = 0;
  let enemyTimer = 0;
  function randomEnemyInterval() {
    return Math.floor(Math.random() * 4000) + 3000;
  }

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layer1.update();
    layer2.update();
    layer3.update();
    player.draw(ctx);
    player.update(input);
    handleEnemies(deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
