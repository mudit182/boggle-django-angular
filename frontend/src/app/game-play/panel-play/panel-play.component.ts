import { Component, OnInit } from '@angular/core';
import { GameService } from '../../shared/game.service';
import { DisplaySettingsService } from '../../shared/display-settings.service';

@Component({
  selector: 'app-panel-play',
  templateUrl: './panel-play.component.html',
  styleUrls: ['./panel-play.component.css']
})
export class PanelPlayComponent implements OnInit {

  constructor(private gameService: GameService, private displaySettingsService: DisplaySettingsService) {
  }

  ngOnInit() {
  }

  newBoard() {
    this.gameService.startGame();
  }

  getCssClass(elementLabel: string) {
    return this.displaySettingsService.getCssClass(elementLabel);
  }

}
