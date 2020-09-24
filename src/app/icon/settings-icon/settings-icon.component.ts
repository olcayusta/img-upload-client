import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings-icon',
  templateUrl: 'settings-24px.svg',
  styles: [`:host {
    display: inline-flex
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsIconComponent {

  constructor() {
  }

}
