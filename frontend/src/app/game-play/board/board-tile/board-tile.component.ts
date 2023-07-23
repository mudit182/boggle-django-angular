import { Component, OnInit, Input } from '@angular/core';
import { DisplaySettingsService } from '../../../shared/display-settings.service';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.css']
})
export class BoardTileComponent implements OnInit {
  @Input() letter: string;
  tileLengthForCss: string;

  constructor(private displaySettingsService: DisplaySettingsService) {}

  ngOnInit() {
  }

  getCssClass(elementLabel: string) {
    return this.displaySettingsService.getCssClass(elementLabel);
  }

  getSelectedStyling(styleType: string) {
    return this.displaySettingsService.getSelectedStyling(styleType);
  }

  getTileLength() {
    return this.displaySettingsService.getTileLength().toString() + 'px';
  }

}
