import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DisplaySettingsService } from '../shared/display-settings.service';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private gameService: GameService, private displaySettingsService: DisplaySettingsService) { }

  ngOnInit() {
    this.initPanel();
  }

  newBoard() {
    this.gameService.startGame();
  }

  isPanelOpen() {
    return this.displaySettingsService.isPanelOpen();
  }

  setPanelOpen(val: boolean) {
    this.displaySettingsService.setPanelOpen(val);
  }

  getCssClass(elementLabel: string) {
    return this.displaySettingsService.getCssClass(elementLabel);
  }

  initPanel() {
    if (window.innerWidth < 780) {
      this.displaySettingsService.setPanelOpen(false);
    } else {
      this.displaySettingsService.setPanelOpen(true);
    }
  }

}
