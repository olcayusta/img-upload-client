import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinkIconComponent } from '../icon/link-icon/link-icon.component';
import { BBCodePipe } from './pipes/bbcode.pipe';
import { HtmlCodePipe } from './pipes/html-code.pipe';
import { MarkdownCodePipe } from './pipes/markdown-code.pipe';
import { ImgLazyLoadDirective } from '../shared/directives/img-lazy-load.directive';
import { MaterialModule } from '../material/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [PostComponent, LinkIconComponent, BBCodePipe, HtmlCodePipe, MarkdownCodePipe, ImgLazyLoadDirective],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }}
  ]
})
export class PostModule { }
