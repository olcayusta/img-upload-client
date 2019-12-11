import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleImageRoutingModule } from './single-image-routing.module';
import { SingleImageComponent } from './single-image.component';

@NgModule({
  declarations: [SingleImageComponent],
  imports: [
    CommonModule,
    SingleImageRoutingModule
  ]
})
export class SingleImageModule { }
