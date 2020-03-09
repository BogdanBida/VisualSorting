import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @Input() array: number[];
  @Input() cur1;
  @Input() cur2;

  constructor() { }

  ngOnInit() {
    this.canv = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = this.canv.getContext("2d");
    this.resizeCanv();
  }


  canv: HTMLCanvasElement;
  ctx: any;
  width: number;
  height: number;

  public resizeCanv(): any {
    this.width = this.canv.clientWidth;
    this.height = this.canv.clientHeight;

    if ((this.canv.width != this.width) || (this.canv.height != this.height)) {
      this.canv.width = this.width;
      this.canv.height = this.height;
    }
    this.render();
  }

  color_block = "#C8646B";
  active_color_block = "#6BC864"
  secont_active_color_block = "#649574"
  color_text = "rgb(255,255,255)";
  font_family = "Arial";

  marginw = 4;
  current_item;
  sub_current_item;
  i = null;
  j = null;
  steps = 0;
  swapsCount = 0;
  isSorted = false;

  public render(): any {
    this.ctx.fillStyle = this.color_block;
    let length = this.array.length;
    let block_size = (this.width - this.marginw) / length;
    let maxItem = Math.max.apply(null, this.array);
    let minItem = Math.min.apply(null, this.array);
    let subzero = (minItem < 0 ? -minItem : 0);
    let range = maxItem + subzero;
    let step = this.height / range; // div zero!
    let zeroLine = subzero * step;
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.font = block_size / 3 + "px " + this.font_family;
    for (let i = 0; i < length; i++) {

      this.ctx.fillStyle = this.color_block
      if (this.cur2 == i) this.ctx.fillStyle = this.secont_active_color_block;
      if (this.cur1 == i) this.ctx.fillStyle = this.active_color_block;

      let value = this.array[i] * step;
      this.ctx.fillRect(
        block_size*i + this.marginw, // x start
        this.height - zeroLine,                      // y start
        block_size - this.marginw, // x2
        -value                   // y2
      )
      this.ctx.fillRect(
        block_size*i + this.marginw,
        this.height - zeroLine - 4,     
        block_size - this.marginw,
        8                   
      )
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#402020";
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(block_size*i + this.marginw/2, 0)
      this.ctx.lineTo(block_size*i + this.marginw/2, this.height);
      this.ctx.stroke();
      if (length < 50) { // add text
        this.ctx.fillStyle = this.color_text;
        this.ctx.fillText(this.array[i], block_size * i + this.marginw + block_size / 3, this.height - 10)
      }
    }
    this.drawZeroLine(zeroLine);
  }
  
  private drawZeroLine(zeroLine: number): any {
    this.ctx.strokeStyle = "#e0e0e0";
    const LineWidth = 2;
    this.ctx.lineWidth = LineWidth;
    this.ctx.setLineDash([4,2]);
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height - zeroLine);
    this.ctx.lineTo(this.width, this.height - zeroLine);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

}
