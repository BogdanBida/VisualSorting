import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  
  constructor(private themeService: ThemeService) { }
  
  ngOnInit() {
  }

  public theme: string = "default";

  onChange() {
    switch (this.theme) {
      case "default":
        this.themeService.applyDefaultTheme();
        break;
        case "dark":
          this.themeService.applyDarkTheme();
          break;
          case "light":
            this.themeService.applyLightTheme();
            break;
      default:
        alert("Unknown theme!")  
      break;
    }
  }

}
