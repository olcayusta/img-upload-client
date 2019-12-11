import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent implements OnInit {
  @Output() openSidenav = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  menuButtonClicked() {
    this.openSidenav.emit(true);
  }
}
