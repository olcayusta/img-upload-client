import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/services/auth.service';

@Component({
  selector: 'app-avatar-popup',
  templateUrl: './avatar-popup.component.html',
  styleUrls: ['./avatar-popup.component.scss']
})
export class AvatarPopupComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

  signOut() {

  }
}
