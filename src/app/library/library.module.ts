import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LibraryComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LibraryModule { }
