import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LibraryService } from '../../shared/services/library.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryResolverService implements Resolve<any> {

  constructor(private libraryService: LibraryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.libraryService.getPhotoLibrary().pipe(
      catchError(err => {
        return EMPTY;
      })
    );
  }
}
