const backgroundImage1 = new Image();
backgroundImage1.src = "./background/city-back.png";
const backgroundImage2 = new Image();
backgroundImage2.src = "./background/city-middle.png";
const backgroundImage3 = new Image();
backgroundImage3.src = "./background/city-foreground.png";

class Background {
  constructor(
    imageWidth,
    imageHeight,
    image,
    speedModifier,
    bggamespeed,
    canvasWidth
  ) {
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.image = image;
    this.speedModifier = speedModifier;
    this.canvasWidth = canvasWidth;
    this.x = 0;
    this.y = 0;
    this.bggamespeed = bggamespeed;
    this.speed = this.bggamespeed * this.speedModifier;
    this.numImages = Math.ceil(this.canvasWidth / this.imageWidth) + 1;
  }

  update() {
    this.speed = this.bggamespeed * this.speedModifier;
    if (this.x <= -this.imageWidth) {
      this.x += this.imageWidth;
    }
    this.x = Math.floor(this.x - this.speed);
  }

  draw(context) {
    for (let i = 0; i < this.numImages; i++) {
      context.drawImage(
        this.image,
        this.x + i * this.imageWidth,
        this.y,
        this.imageWidth,
        this.imageHeight
      );
    }
  }

  restart() {
    this.x = 0;
  }
}

export { backgroundImage1, backgroundImage3, backgroundImage2, Background };
