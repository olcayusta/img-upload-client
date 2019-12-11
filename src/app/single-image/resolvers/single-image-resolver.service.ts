import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, NavigationEnd, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Image } from '../../shared/models/image.model';
import { ImageService } from '../../shared/services/image.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, take } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SingleImageResolverService implements Resolve<Image> {

  constructor(private imageService: ImageService, private router: Router, private location: Location) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Image> | Promise<Image> | Image {
    return this.imageService.getImage(route.paramMap.get('id')).pipe(
      catchError(err => {
        this.router.navigate(['/404'], {
          skipLocationChange: true
        }).then(() => {
          this.location.replaceState(state.url);
        });
        return EMPTY;
      })
    );
  }
}
