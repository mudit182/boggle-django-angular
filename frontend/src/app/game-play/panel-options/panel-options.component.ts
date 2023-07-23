import { Component, OnInit, ElementRef } from '@angular/core';
import { DisplaySettingsService } from '../../shared/display-settings.service';
import { GameService } from '../../shared/game.service';


@Component({
  selector: 'app-panel-options',
  templateUrl: './panel-options.component.html',
  styleUrls: ['./panel-options.component.css']
})
export class PanelOptionsComponent implements OnInit {
  duration: { min: number, sec: number };
  dimensionOptions: number[];
  themeOptions: { displayLabel: string, cssLabel: string }[];
  fontSizeOptions: { displayLabel: string, cssLabel: string }[];
  fontFamilyOptions: { displayLabel: string, cssLabel: string }[];
  showOpaqueBackground: boolean;
  focus: string;


  constructor(
    private gameService: GameService,
    private displaySettingsService: DisplaySettingsService,
    private elementRef: ElementRef
  ) {
    this.duration = { min: this.gameService.getDuration().min, sec: this.gameService.getDuration().sec };
    this.dimensionOptions = gameService.getBoardDimensionOptions();
    this.themeOptions = displaySettingsService.getStylingOptions('theme');
    this.fontSizeOptions = displaySettingsService.getStylingOptions('fontSize');
    this.fontFamilyOptions = displaySettingsService.getStylingOptions('fontFamily');
  }

  ngOnInit() {
    this.showOpaqueBackground = false;
    this.focus = 'nothing';
  }

  getSelectedBoardDimension(dimType: string) {
    return this.gameService.getSelectedBoardDimension(dimType);
  }

  onSelectBoardDimension(dimType: string, dimVal: number) {
    this.gameService.selectBoardDimension(dimType, dimVal);
  }

  setNewDuration() {
    this.gameService.setNewDuration(this.duration.min, this.duration.sec);
    this.duration = { min: this.gameService.getDuration().min, sec: this.gameService.getDuration().sec };
  }

  noSetNewDuration() {
    this.duration = { min: this.gameService.getDuration().min, sec: this.gameService.getDuration().sec };
  }

  timeEdited() {
    if (this.duration.min === this.gameService.getDuration().min && this.duration.sec === this.gameService.getDuration().sec) {
      return false;
    } else {
      return true;
    }
  }

  getTimeInputCssClass() {
    if (this.timeEdited()) {
      return 'input-selection-edited';
    } else {
      return this.getCssClass('input-selection');
    }
  }

  getCssClass(elementLabel: string) {
    return this.displaySettingsService.getCssClass(elementLabel);
  }

  getSelectedStyling(styleType: string) {
    return this.displaySettingsService.getSelectedStyling(styleType);
  }

  onSelectStyling(styleType: string, themeIndex: number) {
    this.displaySettingsService.selectStyling(styleType, themeIndex);
  }

  focusOn(classLabel: string) {
    this.focus = classLabel;
    this.showOpaqueBackground = true;
  }

  focusOff(classLabel: string) {
    if (this.focus === classLabel) {
      this.focus = 'nothing';
      this.showOpaqueBackground = false;
    }
  }

  getPanelBackgroundForCurrentTheme() {
    const theme = this.displaySettingsService.getSelectedStyling('theme');
    switch (theme.displayLabel) {
      case 'Scrabble Tiles':
        return 'rgb(192, 193, 196)';
      case 'Paper Print':
        return 'linear-gradient(90deg, rgb(255, 255, 255), rgb(209, 209, 209))';
      case 'Glass on Pebbles':
        return 'linear-gradient(90deg, rgb(192, 158, 113), rgb(184, 144, 106))';
      case 'Water Bubbles':
        return 'linear-gradient(90deg, rgba(102, 222, 252, 0.527), rgba(13, 132, 161, 0.527))';
      default:
        return 'transparent';
    }
  }

}
