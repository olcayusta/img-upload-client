import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Image } from '../shared/models/image.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleImageComponent implements OnInit {
  image: Image;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.image = this.route.snapshot.data.image;
  }
}
