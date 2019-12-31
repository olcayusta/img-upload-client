import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { UploadService } from '../shared/services/upload.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../shared/services/post.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate(150, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(150, style({opacity: 0}))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDropComponent implements OnInit, OnDestroy {
  dragEnterCount = 0;
  filesToUpload: Array<File> = [];

  @Output() hovered = new EventEmitter();

  subscription: Subscription;

  @HostListener('document:dragenter', ['$event'])
  public onDragEnter(e: DragEvent) {
    e.preventDefault();
    this.dragEnterCount += 1;
    this.hovered.emit(true);
  }

  @HostListener('document:dragleave', ['$event'])
  public onDragLeave(e: DragEvent) {
    e.preventDefault();
    this.dragEnterCount += -1;
  }

  @HostListener('document:dragover', ['$event'])
  public onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  @HostListener('document:drop', ['$event'])
  public onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.dragEnterCount = 0;

    this.dataTransferItemToFile(e.dataTransfer.items);
    if (e.dataTransfer.items) {
      this.uploadToTheServer();
    }
  }

  constructor(
    private router: Router,
    private uploadService: UploadService,
    private postService: PostService
  ) {
  }

  ngOnInit() {
  }

  dataTransferItemToFile(items: DataTransferItemList) {
    Array.from(items).forEach(value => {
      const item = value.getAsFile();
      if (item) {
        this.filesToUpload.push(item);
      }
    });
  }

  async uploadToTheServer() {
    this.uploadService.files = this.filesToUpload;

    sessionStorage.setItem('client', Math.floor(Math.random() * 1000).toString());

    this.subscription = this.postService.savePost(sessionStorage.getItem('client'))
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      )
      .subscribe(async (value: any) => {
      sessionStorage.setItem('token', value.token);

      // Reset files
      this.filesToUpload = [];

      await this.router.navigate([`/p/${value.id}`], {
        state: {
          progress: true
        }
      });
      this.subscription.unsubscribe();

    });
  }

  ngOnDestroy(): void {
    console.log(this.subscription);
  }
}
