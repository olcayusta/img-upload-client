import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, User } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
        this.snackBar.open(this.isSignedIn);
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
          this.snackBar.open(error.error, 'KAPAT');
        });
    });
  }

  signOut() {
    this.myAuth2.signOut();
  }

  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }

  onFailure(error) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSuccess,
      onfailure: this.onFailure
    });
  }

}
