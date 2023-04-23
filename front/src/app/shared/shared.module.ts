import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { SpacerGraphicalComponent } from './components/spacer-graphical/spacer-graphical.component';
import { SpacerComponent } from './components/spacer/spacer.component';

@NgModule({
  declarations: [
    SpacerGraphicalComponent,
    SpacerComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
  ],
  exports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    SpacerGraphicalComponent,
    SpacerComponent,
  ],
})
export class SharedModule { }
