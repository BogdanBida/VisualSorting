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
  @Input() graphicMode;

  public newArray: number[] = [];
  public input:string = "";

  public randLength: number = 16;
  public randMax: number = 50;
  public randMin: number = 0;

  public readonly maxRandLength: number = 250; 
  public readonly minRandLength: number = 3; 
  public readonly maxRandAbsNumber: number = 500;

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
    if (temp.length > this.maxRandLength) {
      this.toastr.error("Array size exceeded", "Error")
      return;
    }
    temp.forEach(element => {
      if (this.isValid(element)) {
        this.newArray.push(Number(element));
      } else {
        this.input = this.input.replace(',' + element, '');
        this.input = this.input.replace(element + ',', '');
      }
    }); 
    this.setArrayEmitter.emit(this.newArray);
  }

  private isValid(element : string): boolean {
    let regx = /^(0$|-?[1-9]\d*|)$/;
    let res = regx.test(element)
    if (res) {
      if (Math.abs(Number(element)) > this.maxRandAbsNumber) {
        this.toastr.warning(`|${element}| exceeds ${this.maxRandAbsNumber}`, "Invalid value")
        return false;
      }
    } else {
      this.toastr.warning(`'${element}' is not integer`, "Invalid value")
    }
    return res;
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

  public shakeArray() {
    let temp = this.input.split(',');
    let replaceArray = [];
    temp.forEach(element => {
      if (this.isValid(element)) {
        replaceArray.push(element);
      } else {
        this.toastr.error('Invalid data!','Error');
        return;
      }
    }); 
    for (let i = replaceArray.length - 1; i >= 1; i--) {
      let j = Math.round(Math.random()*(i));

      let t = replaceArray[j];
      replaceArray[j] = replaceArray[i];
      replaceArray[i] = t;
    }
    this.input = '';
    for (let i = 0; i < replaceArray.length; i++) {
      this.input += replaceArray[i] + (i<replaceArray.length-1?',':'');
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
