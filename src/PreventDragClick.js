export class PreventDragClick {
  constructor(element) {
    this.mouseMoved; //마우스를 드래그했는지 true/false
    let clickStartX;
    let clickStartY;
    let clickStartTime;
    element.addEventListener("mousedown", (e) => {
      clickStartX = e.clientX;
      clickStartY = e.clientY;
      clickStartTime = Date.now();
    });
    element.addEventListener("mouseup", (e) => {
      const xGap = Math.abs(e.clientX - clickStartX);
      const yGap = Math.abs(e.clientY - clickStartY);
      const timeGap = Date.now() - clickStartTime;

      if (xGap > 5 || yGap > 5 || timeGap > 500) this.mouseMoved = true;
      else this.mouseMoved = false;
    });
  }
}
