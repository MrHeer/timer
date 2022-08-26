import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { LongClickDirective } from './directives';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TimerOneComponent } from './timer-one/timer-one.component';
import { TimerTwoComponent } from './timer-two/timer-two.component';
import { TimerService } from './timer.service';
import { Timer } from './timer';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TimerOneComponent,
    TimerTwoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LongClickDirective,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [{ provide: Timer, useClass: TimerService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
