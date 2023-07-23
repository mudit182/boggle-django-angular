import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../shared/game.service';
import { DisplaySettingsService } from '../../../shared/display-settings.service';

@Component({
  selector: 'app-boggle-words',
  templateUrl: './boggle-words.component.html',
  styleUrls: ['./boggle-words.component.css']
})
export class BoggleWordsComponent implements OnInit {
  words: string[];
  showWords: boolean;

  constructor(private gameService: GameService, private displaySettingsService: DisplaySettingsService) {
    this.gameService.boardLettersUpdated.subscribe(
      () => {
        this.words = this.gameService.getBoardWords();
        this.showWords = false;
      });
      this.words = this.gameService.getBoardWords();
      this.showWords = false;
  }

  ngOnInit() {
  }

  timeIsUp() {
    if (this.gameService.getRemainingTime().min === 0 && this.gameService.getRemainingTime().sec === 0) {
      return true;
    } else {
      return false;
    }
  }

  getCssClass(elementLabel: string) {
    return this.displaySettingsService.getCssClass(elementLabel);
  }

  showingSample() {
    return this.gameService.showingSample();
  }

}
