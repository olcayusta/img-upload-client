import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { UploadService } from '../shared/services/upload.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
export class FileDropComponent implements OnInit {
  dragEnterCount = 0;
  filesToUpload: Array<File> = [];

  @Output() hovered = new EventEmitter();

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
    private snackBar: MatSnackBar
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

  uploadToTheServer() {
    this.uploadService.upload(this.filesToUpload).subscribe(value => {
      // Reset files
      this.filesToUpload = [];
      this.router.navigate([`/p/${value.postId}`]);
    });
  }
}
