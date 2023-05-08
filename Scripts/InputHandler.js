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

export default InputHandler;
