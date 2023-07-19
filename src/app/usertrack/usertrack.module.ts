import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsertrackRoutingModule } from './usertrack-routing.module';
import { RegisterComponent } from './register/register.component';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    ViewlistComponent
  ],
  imports: [
    CommonModule,
    UsertrackRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsertrackModule { }
