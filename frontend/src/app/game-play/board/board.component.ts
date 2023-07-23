import { Component, OnInit } from '@angular/core';
import { DisplaySettingsService } from '../../shared/display-settings.service';
import { GameService } from '../../shared/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardLetters: string[][];

  constructor(private gameService: GameService, private displaySettingsService: DisplaySettingsService) {
    this.boardLetters = this.gameService.getBoardLetters();
    this.gameService.boardLettersUpdated.subscribe(
      () => {
        this.boardLetters = this.gameService.getBoardLetters();
      });
  }

  ngOnInit() {
  }

  getCssClass(elementLabel: string) {
    return this.displaySettingsService.getCssClass(elementLabel);
  }

}
