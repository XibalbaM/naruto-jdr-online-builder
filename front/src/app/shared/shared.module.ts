import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  exports: [
    NgOptimizedImage,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
