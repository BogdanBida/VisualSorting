import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  @Output() close = new EventEmitter<void>(); 

  constructor() { }

  ngOnInit() {
  }

  public closeSelf() {
    this.close.emit();
  }

}
