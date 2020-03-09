import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-canvas',
  templateUrl: './custom-canvas.component.html',
  styleUrls: ['./custom-canvas.component.scss']
})
export class CustomCanvasComponent implements OnInit {

  @Input() array: number[];
  @Input() cur1;
  @Input() cur2;
  @Input() animationDuration;

  @Input() max;
  @Input() min;
  @Input() range;
  @Input() len;


  constructor() { }

  ngOnInit() {
  }

  public getList() {
    let arr = []
    for (let i = 0; i < this.len; i++) arr.push(i);
    return arr;
  }

  public getH(value: number): string {
    let height = (value - this.min) * (100 / (this.range));
    return height + "%";
  }

}
