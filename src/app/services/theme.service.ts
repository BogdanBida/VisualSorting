import { Injectable } from '@angular/core';

declare var requir: any;

var defaultTheme;
var darkTheme;
var lightTheme;

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  styleTag: any;

  constructor() {
    require('../../color-themes/color-theme-1.scss').then(file => {
      // alert(file);
      defaultTheme = "body {background-color: red !important; }";
    })
    // requir.import('../../color-themes/color-theme-2.scss').then(file => {
    //   darkTheme = file;
    // })
    // requir.import('../../color-themes/color-theme-3.scss').then(file => {
    //   lightTheme = file;
    // })
    this._createStyle();
  } 

  applyDefaultTheme(){
    this.injectStylesheet(defaultTheme);
  }
  applyDarkTheme(){
    this.injectStylesheet(darkTheme);
  }
  applyLightTheme(){
    this.injectStylesheet(lightTheme);
  }

  private _createStyle() {
    const head = document.head || document.getElementsByTagName('head')[0];
    this.styleTag = document.createElement('style');
    this.styleTag.type = 'text/css';
    this.styleTag.id = 'appthemes';
    head.appendChild(this.styleTag);
  }

  injectStylesheet(css) {
    this.styleTag.innerHTML = css;
  }
}