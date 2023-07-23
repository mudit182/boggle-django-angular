import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountdownTimer } from '../countdowntimer.model';

@Injectable()
export class GameService {
  private boggleBaseUrl = 'http://127.0.0.1:8000/boggle/getNewBoard/';
  private boardWords: string[];
  private boardLetters: string[][];
  private sampleBoardLetters: string[][];
  private boardDimensionOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  private rowNumSelected: number;
  private colNumSelected: number;
  private showSample: boolean;
  @Output() boardLettersUpdated: EventEmitter<void> = new EventEmitter<void>();
  @Output() clockRestarted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient, private timer: CountdownTimer) {
    this.rowNumSelected = 4;
    this.colNumSelected = 4;
    this.boardLetters =  [
      ['*', '*', 'G', '*'],
      ['*', 'O', 'G', '*'],
      ['B', '*', '*', 'L'],
      ['*', '*', 'E', '*']
    ];
    this.sampleBoardLetters = [
      ['*', 'G', '*', '*', '*', 'G', '*', '*', '*', 'G'],
      ['B', 'O', 'G', '*', 'B', 'O', 'G', '*', 'B', 'O'],
      ['*', '*', '*', 'L', '*', '*', '*', 'L', '*', '*'],
      ['*', '*', 'E', '*', '*', '*', 'E', '*', '*', '*'],
      ['*', 'G', '*', '*', '*', 'G', '*', '*', '*', 'G'],
      ['B', 'O', 'G', '*', 'B', 'O', 'G', '*', 'B', 'O'],
      ['*', '*', '*', 'L', '*', '*', '*', 'L', '*', '*'],
      ['*', '*', 'E', '*', '*', '*', 'E', '*', '*', '*'],
      ['*', 'G', '*', '*', '*', 'G', '*', '*', '*', 'G'],
      ['B', 'O', 'G', '*', 'B', 'O', 'G', '*', 'B', 'O'],
    ];
    this.showSample = true;
    this.timer.setGameTime(4, 0);
  }

  startGame() {
    this.showSample = false;
    this.generateNewBoggleBoard();
    this.timer.resetStart();
    this.clockRestarted.emit();
  }

  generateNewBoggleBoard() {
    const boggleUrl = this.boggleBaseUrl + 'row' + this.rowNumSelected + '/col' + this.colNumSelected;
    this.http.get<{status: boolean, board: string[][], words: string[]}>(boggleUrl).subscribe(
      (response) => {
        this.boardLetters = response.board;
        this.boardWords = response.words;
        this.boardLettersUpdated.emit();
      });
  }

  getBoardLetters() {
    if (this.showSample) {
      return this.sampleBoardLetters.slice(0, this.rowNumSelected).map(
        (boardRow) => {
          return boardRow.slice(0, this.colNumSelected);
        }
      );
    } else {
      return this.boardLetters;
    }
  }

  getBoardWords() {
    return this.boardWords;
  }

  showingSample() {
    return this.showSample;
  }

  getBoardDimensionOptions() {
    return this.boardDimensionOptions;
  }

  getSelectedBoardDimension(dimType: string) {
    if (dimType === 'row') {
      return this.rowNumSelected;
    } else if (dimType === 'col') {
      return this.colNumSelected;
    }
  }

  selectBoardDimension(dimType: string, dimVal: number) {
    this.showSample = true;
    if (dimType === 'row') {
      if (this.rowNumSelected !== dimVal) {
        this.rowNumSelected = dimVal;
        this.boardLettersUpdated.emit();
      }
    } else if (dimType === 'col') {
      if (this.colNumSelected !== dimVal) {
        this.colNumSelected = dimVal;
        this.boardLettersUpdated.emit();
      }
    }
  }

  toggleTimer() {
    this.timer.toggleStartStop();
  }

  setNewDuration(min: number, sec: number) {
    min = Math.max(Math.min(Math.round(min), 99), 0);
    sec = Math.max(Math.min(Math.round(sec), 59), 0);
    this.timer.setGameTime(min, sec);
    this.timer.resetTime();
  }

  getDuration() {
    return this.timer.getGameTime();
  }

  getRemainingTime() {
    return this.timer.getRemainingTime();
  }
}
