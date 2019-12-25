import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService, User } from '../shared/services/auth.service';
import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent implements OnInit {
  @Output() openSidenav = new EventEmitter();

  user: User;
  isOpen: boolean;

  scrolBlockStrategy: BlockScrollStrategy;

  constructor(private authService: AuthService, private overlay: Overlay) {
    this.scrolBlockStrategy = overlay.scrollStrategies.block();
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  menuButtonClicked() {
    this.openSidenav.emit(true);
  }

  signOut() {
    this.authService.signOut();
  }

  someHandler() {
    console.log('Outside clicked!');
  }
}
