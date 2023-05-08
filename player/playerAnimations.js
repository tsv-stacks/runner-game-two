const playerIdle = new Image();
playerIdle.src = "./player/player-idle.png";
const playerWalk = new Image();
playerWalk.src = "./player/player-walk.png";
const playerRun = new Image();
playerRun.src = "./player/player-run.png";
const playerDeath = new Image();
playerDeath.src = "./player/player-death.png";
const playerHurt = new Image();
playerHurt.src = "./player/player-hurt.png";
const playerJump = new Image();
playerJump.src = "./player/player-jump.png";
const playerRoll = new Image();
playerRoll.src = "./player/player-roll.png";
const playerSpin = new Image();
playerSpin.src = "./player/player-spin.png";
const playerLand = new Image();
playerLand.src = "./player/player-land.png";
const playerJumpUp = new Image();
playerJump.src = "./player/player-jump-up.png";
const playerJumpDown = new Image();
playerJump.src = "./player/player-jump-down.png";

const playerAnimations = [
  {
    animation: "idle",
    image: playerIdle,
    frames: 10,
  },
  {
    animation: "run",
    image: playerRun,
    frames: 8,
  },
  {
    animation: "death",
    image: playerDeath,
    frames: 10,
  },
  {
    animation: "hurt",
    image: playerHurt,
    frames: 4,
  },
  {
    animation: "jump",
    image: playerJump,
    frames: 3,
  },
  {
    animation: "roll",
    image: playerRoll,
    frames: 7,
  },
  {
    animation: "spin",
    image: playerSpin,
    frames: 6,
  },
  {
    animation: "land",
    image: playerLand,
    frames: 6,
  },
  {
    animation: "jump-up",
    image: playerJumpUp,
    frames: 1,
  },
  {
    animation: "jump-down",
    image: playerJumpDown,
    frames: 1,
  },
  {
    animation: "walk",
    image: playerWalk,
    frames: 8,
  },
];

export default playerAnimations;
