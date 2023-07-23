import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { DisplaySettingsService } from '../shared/display-settings.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit, AfterViewInit {
  @ViewChild('draggableSpace') draggableSpace: ElementRef;
  showPanel: boolean;

  constructor(private displaySettingsService: DisplaySettingsService) {}

  ngOnInit() {
    this.reformatBoard();
  }

  ngAfterViewInit() {
    this.reformatBoard();
  }

  getCssClass(elementLabel: string) {
    return this.displaySettingsService.getCssClass(elementLabel);
  }

  reformatBoard() {
    const draggableSpaceWidth = this.draggableSpace.nativeElement.offsetWidth;
    const draggableSpaceHeight = this.draggableSpace.nativeElement.offsetHeight;
    this.displaySettingsService.reformatBoard(draggableSpaceWidth, draggableSpaceHeight);
  }

  isPanelOpen() {
    return this.displaySettingsService.isPanelOpen();
  }

  isPanelInFront() {
    return this.displaySettingsService.isPanelInFront();
  }

}
