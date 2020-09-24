import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-library-icon',
  templateUrl: 'photo_library-24px.svg',
  styles: [`:host {
    display: inline-flex
  }`]
})
export class PhotoLibraryIconComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
