import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { OutsideClickDirective } from './directives/outside-click.directive';

@NgModule({
  declarations: [OutsideClickDirective],
  imports: [MaterialModule],
  exports: [
    MaterialModule,
    OutsideClickDirective
  ]
})
export class SharedModule {
}
