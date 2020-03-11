import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public manual: boolean = false;
  public about: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public openManual() {
    this.manual = true;
  }

  public closeManual() {
    this.manual = false;
  }

  
  public openAbout() {
    this.about = true;
  }

  public closeAbout() {
    this.about = false;
  }

}
