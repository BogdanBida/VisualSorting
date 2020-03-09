import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logic-core',
  templateUrl: './logic-core.component.html',
  styleUrls: ['./logic-core.component.scss']
})
export class LogicCoreComponent implements OnInit {

  @ViewChild(CanvasComponent) canvas: CanvasComponent;
  public array: number[];
  public arrayMax: number;
  public arrayMin: number;
  public arrayRange: number;
  public arrayLength: number;

  public steps: number = 0;
  public i: number;
  public j: number;
  public swapsCount: number = 0;
  public currentItem1: number;
  public currentItem2: number;
  public isSorted: boolean = false;
  public autoSortToogle = false;

  public sortTypes = [[0, "Bubble Sort"], [1, "Selection Sort"], [2, "Insertion Sort"]];
  public sortType = this.sortTypes[0];
  public graphicMode: number = 1;
  public stepDelay = 500;
  public animationDuration = 0.2;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  public render() {
    if (this.graphicMode === 2) this.canvas.render();
  }

  public changeGraphicMode(t: number) {
    this.graphicMode = t;
    this.render();
  }

  public changeSortType(type) {
    this.sortType = type;
  }

  public changeStepDelay(value: number) {
    this.stepDelay = value;
  }

  public changeAnimDur(value: number) {
    this.animationDuration = value;
  }

  public resetSort() {
    this.render();
    this.currentItem1 = null;
    this.currentItem2 = null;
    this.swapsCount = 0;
    this.steps = 0;
    this.i = null;
    this.j = null;
    this.isSorted = this.checkSorted(this.array);
    this.autoSortToogle = false;
    this.render();
  }

  public stopSort() {
    this.autoSortToogle = false;
  }

  public setArray(newArray: number[]) {
    this.arrayLength = newArray.length;
    this.arrayMax = Math.max.apply(null, newArray);
    this.arrayMin = Math.min.apply(null, newArray);
    this.arrayRange = Math.abs(this.arrayMax - this.arrayMin);
    this.array = newArray;
    this.resetSort();
  }

  private checkSorted(arr: number[]): boolean {
    for (let ii = 1; ii < arr.length; ii++) {
      if (arr[ii - 1] > arr[ii]) return false;
    }
    this.toastr.info('Array is sorted');
    this.isSorted = true;
    this.autoSortToogle = false;
    return true;
  }

  public async autoSort() {
    this.autoSortToogle = true;
    if (this.isSorted) {
      this.toastr.warning('Array is sorted');
      this.autoSortToogle = false;
    } else if (!this.autoSortIteration()) {
      this.toastr.success('Done!');
    }
  }

  private async autoSortIteration() {
    this.render();
    if (this.autoSortToogle) {
      if (this.sortStep()) {
        // let delayMS = 1000 / this.array.length*3;
        await new Promise(resolve => setTimeout(resolve, this.stepDelay));
        this.autoSortIteration();
      } else {
        return false;
      }
    }
    return true;
  }

  public sortStep(): boolean {

    this.render();
    let res: boolean = true;
    if (this.checkSorted(this.array)) {
      return false;
    }

    let n = this.array.length;
    switch (this.sortType[0]) {
      case 0:
        res = this.bubbleSort(n);
        break;
      case 1:
        res = this.selectionSort(n);
        break;
      case 2:
        res = this.insertionSort(n);
        break;
      default:
        alert(this.sortTypes[this.sortType[0]][1] + " in development");
        return false;
    }

    if (!res) {
      this.toastr.success('Sort is end');
    }
    this.render();
    return res;
  }

  private bubbleSort(n: number) {
    this.steps++;
    if (this.i == null || this.j == null) {
      this.i = 0;
      this.j = 0;
    } else {
      if (this.i < n - 1) {
        if (this.array[this.j + 1] < this.array[this.j]) {
          let t = this.array[this.j + 1];
          this.array[this.j + 1] = this.array[this.j];
          this.array[this.j] = t;
          this.swapsCount++;
        }

        if (this.j > n - this.i) {
          this.i++;
          this.j = 0;
        } else {
          this.j++;
        }
      } else {
        return false;
      }
    }
    this.currentItem1 = this.j;
    this.currentItem2 = this.j + 1;
    return true;
  }

  private selectionSort(n: number) {
    this.steps++;
    if (this.i == null) {
      this.i = 0;
      this.currentItem1 = 0;
      this.currentItem2 = 0;
    } else {
      this.currentItem2++;
      // when find minimum
      if (this.array[this.currentItem2] < this.array[this.currentItem1]) {
        this.currentItem1 = this.currentItem2;
      }
      // end of iteration
      if (this.currentItem2 == n) {
        if (this.array[this.currentItem1] < this.array[this.i]) {
          let t = this.array[this.currentItem1];
          this.array[this.currentItem1] = this.array[this.i];
          this.array[this.i] = t;
          this.swapsCount++;
        }
        this.i++;
        this.currentItem2 = this.i;
      }
      if (this.i == n - 1) {
        return false;
      }
    }
    return true;
  }

  public insertionSort(n: number) {
    this.steps++;
    if (this.i == null || this.j == null) {
      this.i = 0;
      // this.j = this.i+1;
      this.currentItem2 = this.i;
      this.currentItem1 = this.i+1;
    } else {
      if (this.array[this.currentItem1] < this.array[this.currentItem2]) {
        let t = this.array[this.currentItem1];
        this.array[this.currentItem1] = this.array[this.currentItem2];
        this.array[this.currentItem2] = t;
        this.currentItem1--;
        this.currentItem2 = this.currentItem1-1;
      } else {
        this.i++;
        this.currentItem1 = this.i+1;
      }
    }
    return true;
  }

}
