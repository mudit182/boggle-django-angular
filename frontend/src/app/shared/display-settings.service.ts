import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable()
export class DisplaySettingsService {
  private boardRowNum: number;
  private boardColNum: number;
  private maxBoardWidth: number;
  private maxBoardHeight: number;
  private boardTileLength: number;

  private themes: {displayLabel: string, cssLabel: string}[];
  private themeSelected: {displayLabel: string, cssLabel: string};
  private fontSizes: {displayLabel: string, cssLabel: string}[];
  private fontSizeSelected: {displayLabel: string, cssLabel: string};
  private fontFamilies: {displayLabel: string, cssLabel: string}[];
  private fontFamilySelected: {displayLabel: string, cssLabel: string};

  private panelOpen: boolean;
  private panelInFront: boolean;

  constructor(private gameService: GameService) {
    this.boardRowNum = gameService.getSelectedBoardDimension('row');
    this.boardColNum = gameService.getSelectedBoardDimension('col');
    this.gameService.boardLettersUpdated.subscribe(
      () => {
        this.boardRowNum = gameService.getSelectedBoardDimension('row');
        this.boardColNum = gameService.getSelectedBoardDimension('col');
        this.updateBoardTileLength();
      }
    );
    this.initializeStyles();
  }

  reformatBoard(draggableSpaceWidth: number, draggableSpaceHeight: number) {
    this.maxBoardWidth = draggableSpaceWidth * 0.75;
    this.maxBoardHeight = draggableSpaceHeight * 0.75;
    this.updateBoardTileLength();
  }

  updateBoardTileLength() {
    const maxTileWidth = Math.round(this.maxBoardWidth / this.boardColNum);
    const maxTileHeight = Math.round(this.maxBoardHeight / this.boardRowNum);
    this.boardTileLength = Math.min(maxTileWidth, maxTileHeight);
  }

  getTileLength() {
    return this.boardTileLength;
  }

  getCssClass(elementLabel: string) {
    return this.themeSelected.cssLabel + '-' + elementLabel;
  }

  getStylingOptions(styleType: string) {
    if (styleType === 'theme') {
      return this.themes;
    }
    if (styleType === 'fontSize') {
      return this.fontSizes;
    }
    if (styleType === 'fontFamily') {
      return this.fontFamilies;
    }
  }

  selectStyling(styleType: string, themeIndex: number) {
    if (styleType === 'theme') {
      this.themeSelected = this.themes[themeIndex];
    }
    if (styleType === 'fontSize') {
      this.fontSizeSelected = this.fontSizes[themeIndex];
    }
    if (styleType === 'fontFamily') {
      this.fontFamilySelected = this.fontFamilies[themeIndex];
    }
  }

  getSelectedStyling(styleType: string) {
    if (styleType === 'theme') {
      return this.themeSelected;
    }
    if (styleType === 'fontSize') {
      return this.fontSizeSelected;
    }
    if (styleType === 'fontFamily') {
      return this.fontFamilySelected;
    }
  }

  initializeStyles() {
    this.themes = [
      {displayLabel: 'Scrabble Tiles', cssLabel: 'scrabble-tiles'},
      {displayLabel: 'Paper Print', cssLabel: 'paper-print'},
      {displayLabel: 'Glass on Pebbles', cssLabel: 'pebble-glass'},
      {displayLabel: 'Water Bubbles', cssLabel: 'water-bubbles'},
      {displayLabel: 'Style 5', cssLabel: 'style5'}
    ];
    this.themeSelected = this.themes[0];
    this.fontSizes = [
      {displayLabel: 'Small', cssLabel: '2em'},
      {displayLabel: 'Medium', cssLabel: '3em'},
      {displayLabel: 'Large', cssLabel: '4em'},
      {displayLabel: 'Xlarge', cssLabel: '5em'}
    ];
    this.fontSizeSelected = this.fontSizes[1];
    this.fontFamilies = [
      {displayLabel: 'Verdana', cssLabel: 'verdana'},
      {displayLabel: 'Comic Sans MS', cssLabel: '"Comic Sans MS"'},
      {displayLabel: 'Baskerville', cssLabel: 'Baskerville, "Hoefler Text", "Times New Roman"'},
      {displayLabel: 'Arial Rounded MT Bold', cssLabel: '"Arial Rounded MT Bold"'},
      {displayLabel: 'Arial Black', cssLabel: '"Arial Black"'}
    ];
    this.fontFamilySelected = this.fontFamilies[3];
  }

  isPanelOpen() {
    return this.panelOpen;
  }

  setPanelOpen(val: boolean) {
    this.panelOpen = val;
  }

  isPanelInFront() {
    if (window.innerWidth > 1024) {
      return false;
    } else {
      return true;
    }
  }

}
