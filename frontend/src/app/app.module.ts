import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { BoardTileComponent } from './game-play/board/board-tile/board-tile.component';
import { BoardComponent } from './game-play/board/board.component';
import { BoggleWordsComponent } from './game-play/panel-play/boggle-words/boggle-words.component';
import { ClockComponent } from './game-play/panel-play/clock/clock.component';
import { CountdownTimer } from './countdowntimer.model';
import { DisplaySettingsService } from './shared/display-settings.service';
import { GameService } from './shared/game.service';
import { SelectionListDirective } from './directives/selection-list.directive';
import { PanelOptionsComponent } from './game-play/panel-options/panel-options.component';
import { PanelPlayComponent } from './game-play/panel-play/panel-play.component';
import { SelectionListItemHoverDirective } from './directives/selection-list-item-hover.directive';
import { ButtonSpecialEffectsDirective } from './directives/button-special-effects.directive';
import { HelpComponent } from './game-play/help/help.component';


@NgModule({
  declarations: [
    AppComponent,
    GamePlayComponent,
    HeaderComponent,
    BoardComponent,
    BoardTileComponent,
    PanelOptionsComponent,
    PanelPlayComponent,
    BoggleWordsComponent,
    ClockComponent,
    SelectionListDirective,
    SelectionListItemHoverDirective,
    ButtonSpecialEffectsDirective,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DisplaySettingsService, GameService, CountdownTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }
