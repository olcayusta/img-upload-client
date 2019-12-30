import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Library } from '../models/library.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  getPhotoLibrary() {
    return this.http.get<Library>(`${environment.apiUrl}/library`);
  }
}
