import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  
  @Input() steps;
  @Input() swaps;
  @Input() isSorted;

  constructor() { }

  ngOnInit() {
  }

}
