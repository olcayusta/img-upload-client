import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {
    this.swUpdate.available.subscribe(evt => {
      const snack = this.snackBar.open('Güncelleme var!', 'YENİLE');
      snack.onAction().subscribe(() => {
        window.location.reload();
      });
    });
  }
}
