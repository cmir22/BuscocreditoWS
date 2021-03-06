import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPostRoutingModule } from './new-post-routing.module';
import { NewPostComponent } from './new-post.component';

import { MaterialModule } from '../../../material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewPostComponent],
  imports: [
    CommonModule,
    NewPostRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports:[NewPostComponent]
})
export class NewPostModule { }
