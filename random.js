//   class Player {
//     constructor(gameWidth, gameHeight) {
//       this.gameHeight = gameHeight;
//       this.gameWidth = gameWidth;
//       this.width = 48;
//       this.height = 48;
//       this.scaleWidth = this.width * 2;
//       this.scaleHeight = this.height * 2;
//       this.x = 10;
//       this.y = this.gameHeight - this.scaleHeight;

//       this.playerAnimations = playerAnimations;
//       this.frameX = 0;
//       this.speed = 0;
//       this.currentAnimation = "idle";
//       this.maxFrames = 9;
//       this.donorWidth = 48;
//       this.donorHeight = 48;

//       this.vy = 0;
//       this.gravity = 1;
//       this.jumpPower = 25;
//       this.maxJumpCount = 2;
//       this.jumpCount = 0;
//     }
//     draw(context) {
//       context.fillStyle = "black";
//       context.drawImage(
//         this.playerAnimations[1].image,
//         this.frameX * this.width,
//         0,
//         this.width,
//         this.height,
//         this.x,
//         this.y - 30,
//         this.scaleWidth,
//         this.scaleHeight
//       );
//     }
//     update(input) {
//       if (this.vy < 0) {
//         console.log("jump up");
//       } else if (this.vy > 0) {
//         console.log("fall");
//       } else if (this.speed !== 0) {
//         console.log("running");
//       } else {
//         console.log("idle");
//         this.currentAnimation = "idle";
//         const newAnimation = playerAnimations.find((animation) => {
//           return animation.animation === this.currentAnimation;
//         });
//       }
//       // controls
//       if (input.keys.indexOf("ArrowRight") > -1) {
//         this.speed = 4;
//       } else if (input.keys.indexOf("ArrowLeft") > -1) {
//         this.speed = -4;
//       } else {
//         this.speed = 0;
//       }
//       //horizontal movement
//       this.x += this.speed;
//       if (this.x < 0) this.x = 0;
//       else if (this.x > this.gameWidth - this.scaleWidth)
//         this.x = this.gameWidth - this.scaleWidth;
//       // vertical movement
//       if (
//         input.keys.indexOf("ArrowUp") > -1 &&
//         this.jumpCount < this.maxJumpCount
//       ) {
//         this.vy = -this.jumpPower;
//         this.jumpCount++;
//       }
//       this.vy += this.gravity;
//       this.y += this.vy;
//       if (this.y + this.scaleHeight > this.gameHeight) {
//         this.y = this.gameHeight - this.scaleHeight;
//         this.vy = 0;
//         this.jumpCount = 0;
//       }
//     }
//   }

context.strokeRect(this.x + 67, this.y - 10, 36 * 2.4, 24 * 2.7);
