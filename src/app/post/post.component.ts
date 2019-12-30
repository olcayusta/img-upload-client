import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { Post } from '../shared/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { UploadService } from '../shared/services/upload.service';
import { HttpEventType } from '@angular/common/http';
import { Image } from '../shared/models/image.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  images: Image[];

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files = [];

  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    /*   if (this.isUploading) {
         $event.returnValue = 'Your data will be lost!';
       }*/
    // $event.returnValue = 'Your data will be lost!';
  }

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private title: Title,
    private uploadService: UploadService
  ) {
  }

  ngOnInit() {
    /* Notification.requestPermission();
     const notification = new Notification('1 / 4', {
       body: 'blabla yüklendi.',
       image: 'https://www.bing.com/th/id/OIP.JKgmipycDyunv3E_I86eFgHaLK?w=198&h=300&c=7&o=5&pid=1.7'
     });*/

    document.onvisibilitychange = ev => {
      console.log(document.visibilityState);
    };

    const files: FileList[] = this.uploadService.files;

    if (files) {
      for (const file of files) {
        this.files.push({data: file, inProgress: false, progress: 0});
      }
      this.uploadService.files = null;
      this.uploadFiles();
    } else {
      this.images = this.route.snapshot.data.post;
    }
  }

  uploadFile(file) {
    file.inProgress = true;
    this.uploadService.upload(file).subscribe(e => {
      if (e.type === HttpEventType.UploadProgress) {
        file.progress = Math.round((e.loaded * 100) / e.total);
      }

      if (e.type === HttpEventType.Response) {
        file.url = e.body.publicUrl;
        this.snackBar.open('Bir resim yüklendi!');
      }
    });
  }

  private uploadFiles() {
    // this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  // Image loaded
  imgLoad($event: Event) {
    const img = $event.target as HTMLImageElement;
    URL.revokeObjectURL(img.src);
  }
}
