import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      this.snackBar.open(error.error, 'DAHA FAZLA OKU');
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  upload(files: Array<File>) {
    const formData: FormData = new FormData();
    files.forEach((value: File) => formData.append(`files[]`, value));
    const headers = new HttpHeaders({
      'ngsw-bypass': 'true'
    });
    return this.http.post<any>(`${environment.apiUrl}/upload`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  uwsUpload(file: File) {
    const formData: FormData = new FormData();
    formData.append(`files[]`, file);
    const headers = new HttpHeaders({
      'ngsw-bypass': 'true'
    });
    return this.http.post<any>(`http://localhost:3333/upload`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  upload2(file) {
    const formData: FormData = new FormData();
    formData.set('files[]', file);
    return this.http.post<any>(`${environment.apiUrl}/upload`, formData);
  }
}
