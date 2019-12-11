import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleImageComponent } from './single-image.component';
import { SingleImageResolverService } from './resolvers/single-image-resolver.service';

const routes: Routes = [{ path: '', component: SingleImageComponent, resolve: { image: SingleImageResolverService } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleImageRoutingModule { }
