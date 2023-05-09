export function displayStatusText(
  context,
  score,
  canvasWidth,
  canvasHeight,
  gameOver
) {
  if (!gameOver) {
    context.textAlign = "left";
    context.font = "40px Common Pixel, sans-serif";
    context.fillStyle = "black";
    context.fillText(`SCORE: ${score}`, 22, 50);
    context.fillStyle = "white";
    context.fillText(`SCORE: ${score}`, 24, 52);
  } else {
    context.textAlign = "center";
    context.font = "60px Karmatic Arcade, Common Pixel";
    context.fillStyle = "black";
    const line1 = "GAME OVER";
    const line2 = `SCORE: ${score}`;
    context.fillText(line1, canvasWidth / 2, canvasHeight / 2 - 80);
    context.fillText(line2, canvasWidth / 2, canvasHeight / 2 + 80);
    context.fillStyle = "white";
    context.fillText(line1, canvasWidth / 2 + 4, canvasHeight / 2 - 76);
    context.fillText(line2, canvasWidth / 2 + 4, canvasHeight / 2 + 84);
    context.textAlign = "center";
    context.font = "40px Common Pixel, sans-serif";
    context.fillStyle = "black";
    context.fillText(
      `PRESS ENTER TO TRY AGAIN`,
      canvasWidth / 2,
      canvasHeight - 100
    );
    context.fillStyle = "white";
    context.fillText(
      `PRESS ENTER TO TRY AGAIN`,
      canvasWidth / 2 + 2,
      canvasHeight - 102
    );
  }
}

export function liveHearts(context, heart) {
  let heartImg = new Image();
  if (heart === 3) {
    heartImg.src = "./Hearts/heart-3.png";
  } else if (heart === 2) {
    heartImg.src = "./Hearts/heart-2.png";
  } else if (heart === 1) {
    heartImg.src = "./Hearts/heart-1.png";
  } else if (heart === 0) {
    heartImg.src = "./Hearts/heart-0-2.png";
    return context.drawImage(heartImg, 0, 0, 236, 76, 20, 60, 150, 50);
  }
  context.drawImage(heartImg, 0, 0, 192, 76, 20, 60, 150, 50);
}
