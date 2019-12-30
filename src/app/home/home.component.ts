import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UploadService } from '../shared/services/upload.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../shared/services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  isUploading;
  filesToUpload: Array<File> = [];

  progress;

  subscription: Subscription;

  @HostListener('document:paste', ['$event'])
  public async onPaste(ev: ClipboardEvent) {

    const items = ev.clipboardData.items;
    if (items.length > 0) {
      this.dataTransferItemToFile(items);
    }

    const dataText = ev.clipboardData.getData('Text');
    if (dataText) {
      try {
        const xxx = await this.isLinkImageFile(dataText);
        const file = await this.srcToFile(dataText);
        this.filesToUpload = [file];

        sessionStorage.setItem('client', Math.floor(Math.random() * 1000).toString());

        this.postService.savePost(sessionStorage.getItem('client')).subscribe(value => {

          // @ts-ignore
          sessionStorage.setItem('token', value.token);

          this.uploadService.files = this.filesToUpload;

          this.router.navigate([`/p/${value.id}`], {
            state: {
              progress: true
            }
          });
        });

      } catch (e) {
        this.snackBar.open(e);
      }
    }
  }

  constructor(
    private postService: PostService, private uploadService: UploadService, private router: Router, private snackBar: MatSnackBar) {
  }

  dataTransferItemToFile(items: DataTransferItemList) {
    Array.from(items).forEach(value => {
      const item = value.getAsFile();
      if (item) {
        this.filesToUpload.push(item);
      }
    });
    if (this.filesToUpload.length > 0) {

      sessionStorage.setItem('client', Math.floor(Math.random() * 1000).toString());

      this.postService.savePost(sessionStorage.getItem('client')).subscribe((value: any) => {
        console.log(items);


        sessionStorage.setItem('token', value.token);

        this.uploadService.files = this.filesToUpload;

        this.router.navigate([`/p/${value.id}`], {
          state: {
            progress: true
          }
        });
      });
    }
  }

  async isLinkImageFile(dataText: string) {
    return new Promise((resolve, reject) => {
      const fakeImage = new Image();
      fakeImage.src = dataText;

      fakeImage.onload = (img) => resolve(true);
      fakeImage.onerror = () => reject(new Error('Maalesef, URL yüklenemedi.'));
    });
  }

  async srcToFile(src: string) {
    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(src);
    const blobPart = await response.blob();
    console.log(blobPart.type);
    return new File([blobPart], 'file', {type: blobPart.type});
  }

  ngOnInit() {
  }

  onChange($event: Event) {
    sessionStorage.setItem('client', Math.floor(Math.random() * 1000).toString());

    this.subscription = this.postService.savePost(sessionStorage.getItem('client')).subscribe((value: any) => {
      sessionStorage.setItem('token', value.token);

      this.uploadService.files = ($event.target as HTMLInputElement).files;

      this.router.navigate([`/p/${value.id}`], {
        state: {
          progress: true
        }
      });
    });
  }

  ngOnDestroy(): void {


  }
}
