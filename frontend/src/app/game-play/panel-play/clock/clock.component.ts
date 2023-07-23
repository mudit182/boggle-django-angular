import { Component, OnInit, Input, ElementRef, HostBinding, OnChanges } from '@angular/core';
import { GameService } from '../../../shared/game.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  clockShakeStarted = true;
  clockIconPos = '0px';
  clockShakeInterval: any;
  timerBlinkInterval: any;
  coverTimerDisplay = false;
  @Input() fontSizeInEm: number;
  @Input() widthInPx: number;
  @Input() heightInPx: number;
  @Input() shadowEffect: false;
  @HostBinding('style.fontSize') fontSize: string;
  @HostBinding('style.width') width: string;
  @HostBinding('style.height') height: string;


  constructor(private gameService: GameService, private elementRef: ElementRef) {
    gameService.clockRestarted.subscribe(
      () => {
        this.clockShakeStarted = false;
      });
  }

  ngOnInit() {
    this.fontSize = this.fontSizeInEm.toString() + 'em';
    this.width = this.widthInPx.toString() + 'px';
    this.height = this.heightInPx.toString() + 'px';
    if (this.shadowEffect) {
      this.elementRef.nativeElement.querySelector('.clock-space').style.boxShadow = '1px 1px 5px grey';
    }

  }

  getRemainingTimeAsStr() {
    const time = this.gameService.getRemainingTime();
    return this.getFormattedNumber(time.min) + ':' + this.getFormattedNumber(time.sec);
  }

  getFormattedNumber(num: number) {
    num = Math.round(num);
    return ('00' + num).slice(-2);
  }

  controlTimer() {
    this.gameService.toggleTimer();
  }

  getTimeDisplayColor() {
    if (this.timeBelow1Min()) {
      const secRemaining = this.gameService.getRemainingTime().sec;
      if (secRemaining < 30) {
        const greenValue = 75 + secRemaining * 6;
        return  'rgb(255, ' + greenValue.toString() + ', 75)';
      } else {
        const redValue = 255 - 6 * (secRemaining - 30);
        return 'rgb(' + redValue.toString() + ', 255, 75)';
      }
    } else {
      return 'rgb(75, 255, 75)';
    }
  }

  timeBelow1Min() {
    if (this.gameService.getRemainingTime().min === 0) {
      return true;
    } else {
      return false;
    }
  }

  timeBelow30Sec() {
    if (this.gameService.getRemainingTime().min === 0 && this.gameService.getRemainingTime().sec < 30) {
      return true;
    } else {
      return false;
    }
  }

  timeBelow10Sec() {
    if (this.gameService.getRemainingTime().min === 0 && this.gameService.getRemainingTime().sec < 10) {
      return true;
    } else {
      return false;
    }
  }

  timeIsUp() {
    if (this.gameService.getRemainingTime().min === 0 && this.gameService.getRemainingTime().sec === 0) {
      return true;
    } else {
      return false;
    }
  }

  getPosClockIcon() {
    if (this.timeIsUp()) {
      return this.shakeClock();
    } else {
      return '0px';
    }
  }

  shakeClock() {
    if (!this.clockShakeStarted) {
      this.clockShakeStarted = true;
      if (this.clockShakeInterval) {
        clearInterval(this.clockShakeInterval);
        clearInterval(this.timerBlinkInterval);
      }
      this.clockShakeInterval = setInterval(() => {
        this.clockIconPos = '1px';
        setTimeout(() => {
          this.clockIconPos = '-1px';
        }, 100);
      }, 200);
      setTimeout(() => {
        clearInterval(this.clockShakeInterval);
        this.clockIconPos = '0px';
      }, 10000);

      this.timerBlinkInterval = setInterval(() => {
        this.coverTimerDisplay = true;
        setTimeout(() => {
          this.coverTimerDisplay = false;
        }, 500);
      }, 1000);
      setTimeout(() => {
        clearInterval(this.timerBlinkInterval);
        this.coverTimerDisplay = false;
      }, 10000);
    }
    return this.clockIconPos;
  }

}
