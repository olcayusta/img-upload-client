import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output() openSidenav = new EventEmitter();

  isLoggedIn$;

  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    // this.user = this.authService.getUser();
  }

  menuButtonClicked() {
    this.openSidenav.emit(true);
  }

  signOut() {
    this.authService.signOut();
  }
}
