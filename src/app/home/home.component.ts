import { Component, HostListener, OnInit } from '@angular/core';
import { UploadService } from '../shared/services/upload.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isUploading;
  isUploaded = false;
  filesToUpload: Array<File> = [];

  progress;

  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    // if (this.isUploading) {
    //   $event.returnValue = 'Your data will be lost!';
    // }
  }

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
        this.uploadToTheServer();
      } catch (e) {
        this.snackBar.open(e);
      }
    }
  }

  constructor(private uploadService: UploadService, private router: Router, private snackBar: MatSnackBar) {
  }

  dataTransferItemToFile(items: DataTransferItemList) {
    Array.from(items).forEach(value => {
      const item = value.getAsFile();
      if (item) {
        this.filesToUpload.push(item);
      }
    });
    if (this.filesToUpload.length > 0) {
      this.uploadToTheServer();
    }
  }

  async isLinkImageFile(dataText: string) {
    return new Promise((resolve, reject) => {
      const fakeImage = new Image();
      fakeImage.src = dataText;

      fakeImage.onload = (img) => {
        resolve(true);
      };

      fakeImage.onerror = () => {
        reject(new Error('Maalesef, URL yüklenemedi.'));
      };
    });
  }

  async srcToFile(src: string) {
    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(src);
    const arrayBuffer = response.arrayBuffer();
    const buffer = await arrayBuffer;
    return new File([buffer], 'example.jpg', {type: 'image/jpeg'});
  }

  ngOnInit() {
  }

  onChange($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
    this.filesToUpload = Array.from(files);
    this.uploadToTheServer();

    //  this.snackBar.open(`Can't send photo. Retry in 5 seconds`, 'YİNELE');
  }

  uploadToTheServer() {
    this.isUploading = true;
    this.uploadService.upload(this.filesToUpload).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        console.log('upload progress');
        const p = Math.round(event.loaded / event.total * 100);
        this.progress = p;
        console.log(p);
      }

      if (event.type === HttpEventType.DownloadProgress) {
        console.log('download progress');
      }

      if (event.type === HttpEventType.Response) {
        console.log('donwload completed');
        this.isUploaded = false;
        this.router.navigate([`/p/${event.body.postId}`]);
        this.snackBar.open(event.body.message);
      }
    });
  }
}
