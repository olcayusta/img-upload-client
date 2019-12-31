import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, User } from '../shared/services/auth.service';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  myAuth2;
  user: User;

  isSignedIn;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        ux_mode: 'popup',
        client_id: '471440911060-rl9e80le54u8q5jf6ibjlbs6auqlo52o.apps.googleusercontent.com'
      });

      this.myAuth2 = auth2;

      auth2.currentUser.listen(user1 => {
        this.isSignedIn = user1.isSignedIn();
      });

      auth2.attachClickHandler(document.getElementById('customBtn'), {},
        (googleUser) => {

          const name = googleUser.getBasicProfile().getName();
          const email = googleUser.getBasicProfile().getEmail();
          const imageUrl = googleUser.getBasicProfile().getImageUrl();

          this.user = {
            name, email, imageUrl
          };

          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.authService.updateUser(this.user);
        }, (error: any) => {
          // this.snackBar.open(error.error, 'KAPAT');
          console.log(error);
        });
    });
  }

  signOut() {
    this.myAuth2.signOut();
    this.authService.signOut();
  }
}
