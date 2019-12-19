import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatermarkRoutingModule } from './watermark-routing.module';
import { WatermarkComponent } from './watermark.component';


@NgModule({
  declarations: [WatermarkComponent],
  imports: [
    CommonModule,
    WatermarkRoutingModule
  ]
})
export class WatermarkModule { }
