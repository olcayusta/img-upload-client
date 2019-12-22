import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  myAuth2;
  user: User;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        ux_mode: 'popup',
        client_id: '471440911060-rl9e80le54u8q5jf6ibjlbs6auqlo52o.apps.googleusercontent.com',

      });

      this.myAuth2 = auth2;

      auth2.attachClickHandler(document.getElementById('customBtn'), {},
        (googleUser) => {
          console.log('success');

          const name = googleUser.getBasicProfile().getName();
          const email = googleUser.getBasicProfile().getEmail();
          const imageUrl = googleUser.getBasicProfile().getImageUrl();

          this.user = {
            name, email, imageUrl
          };

          localStorage.setItem('user', JSON.stringify(this.user));

        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
    });
  }

  ngAfterViewInit(): void {


  }

  attachSignin(element) {

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
