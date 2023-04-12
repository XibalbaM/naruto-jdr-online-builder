import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
  ],
  exports: [
    NgOptimizedImage,
    FormsModule,
  ]
})
export class SharedModule { }
