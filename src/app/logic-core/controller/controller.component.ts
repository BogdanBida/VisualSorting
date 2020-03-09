import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  @Input() array;
  @Output() setArrayEmitter = new EventEmitter<number[]>();
  @Output() sortStepEmitter = new EventEmitter<void>();
  @Output() autoSortEmitter = new EventEmitter<void>();
  @Output() stopSortEmitter = new EventEmitter<void>();
  @Output() resetSortEmitter = new EventEmitter<void>();
  @Output() changeSortTypeEmitter = new EventEmitter<number>();
  @Output() changeStepDelayEmitter = new EventEmitter<number>();
  @Output() changeAnimDurEmitter = new EventEmitter<number>();
  

  @Input() sortType;
  public newSortType;
  @Input() sortTypes;
  @Input() autoSortToogle;
  @Input() stepDelay;
  @Input() animationDuration;

  public newArray: number[] = [];
  public input:string = "";

  public randLength: number = 8;
  public randMax: number = 50;
  public randMin: number = -1;

  public readonly maxRandLength: number = 100; 
  public readonly minRandLength: number = 3; 
  public readonly maxRandNumber: number = 500;
  public readonly minRandNumber: number = -500;

  public stepDelayCurrent: number;
  public animationDurationCurrent: number;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.stepDelayCurrent = this.stepDelay;
    this.animationDurationCurrent = this.animationDuration;
    this.newSortType = this.sortType;
  }

  public stopSort() {
    this.stopSortEmitter.emit();
  }

  public resetSort() {
    this.resetSortEmitter.emit();
  }

  public sortStep() {
    this.sortStepEmitter.emit();
  }

  public autoSort() {
    this.autoSortEmitter.emit();
  }

  public initArray() {
    this.newArray = [];
    let temp = this.input.split(',');
    temp.forEach(element => {
      if (this.isValid(element)) {
        this.newArray.push(Number(element));
      } else {
        this.toastr.error('Invalid data!','Error');
        return;
      }
    }); 
    this.setArrayEmitter.emit(this.newArray);
  }

  private isValid(element : string): boolean {
    let regx = /^(0$|-?[1-9]\d*(\.\d*[1-9]$)?|-?0\.d*[1-9])$/;
    return regx.test(element);
  }

  public createRandArray() {
    this.input = "";
    this.randMax = Number(this.randMax);
    this.randMin = Number(this.randMin);
    let randRange = Math.abs(this.randMax - this.randMin)
    for (let i = 0; i < this.randLength; i++) {
      this.input += Math.round(Math.random()*randRange + this.randMin) + (i<this.randLength-1?',':'');
    } 
    this.initArray(); 
  }

  public settings = false;

  public showSettings() {
    this.settings = true;
  }
  public closeSettings() {
    this.settings = false;
  }

  public changeSortType() {
    this.changeSortTypeEmitter.emit(this.newSortType);
    this.resetSort();
  }

  public changeStepDelay() {
    this.changeStepDelayEmitter.emit(this.stepDelayCurrent);
  }

  public changeAnimDur() {
    this.changeAnimDurEmitter.emit(this.animationDurationCurrent);
  }
}
