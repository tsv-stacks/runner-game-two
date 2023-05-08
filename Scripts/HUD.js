export function displayStatusText(context, score) {
  context.font = "40px Helvetica";
  context.fillStyle = "black";
  context.fillText(`Score: ${score}`, 20, 50);
  context.fillStyle = "white";
  context.fillText(`Score: ${score}`, 22, 52);
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
