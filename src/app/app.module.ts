import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogicCoreComponent } from './logic-core/logic-core.component';
import { CanvasComponent } from './logic-core/canvas/canvas.component';
import { ControllerComponent } from './logic-core/controller/controller.component';
import { StatisticComponent } from './logic-core/statistic/statistic.component';
import { CustomCanvasComponent } from './logic-core/custom-canvas/custom-canvas.component';
import { ManualComponent } from './header/manual/manual.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      LogicCoreComponent,
      CanvasComponent,
      ControllerComponent,
      StatisticComponent,
      CustomCanvasComponent,
      ManualComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
         progressBar: true
    }),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
