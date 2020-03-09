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


  constructor() { }

  ngOnInit() {
  }

  public getH(value: number): string {
    let height = (value*100)/this.max;
    return height + "%";
  }

}
