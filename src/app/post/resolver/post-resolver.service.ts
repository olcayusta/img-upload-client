import { Injectable } from '@angular/core';
import { PostService } from '../../shared/services/post.service';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Post } from '../../shared/models/post.model';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PostResolverService implements Resolve<Post> {

  constructor(private postService: PostService, private router: Router, private location: Location) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> | Promise<Post> | Post {
    return this.postService.getPost(route.paramMap.get('id')).pipe(
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

