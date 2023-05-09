export function displayStatusText(context, score) {
  context.font = "40px Common Pixel, sans-serif";
  context.fillStyle = "black";
  context.fillText(`SCORE: ${score}`, 22, 50);
  context.fillStyle = "white";
  context.fillText(`SCORE: ${score}`, 24, 52);
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
