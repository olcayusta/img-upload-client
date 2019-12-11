import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Post } from '../shared/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((value) => {
      this.post = this.route.snapshot.data.post;
      this.cdr.markForCheck();
    });
  }

  linkCopied() {
    this.snackBar.open('Panoya kopyalandı');
  }
}
