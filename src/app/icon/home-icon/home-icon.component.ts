import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-icon',
  templateUrl: 'home-24px.svg',
  styles: [`:host {
    display: inline-flex
  }`]
})
export class HomeIconComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
