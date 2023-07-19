import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './usertrack/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent
  }, {
    path: 'login',
    component: SigninComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    // canActivate: [AuthGuard],
    children:[
      // {
      //   path:'',
      //   redirectTo:'dashboard',
      //   pathMatch:'full'
      // },
      {
        path:'users',
        loadChildren:()=>import('./usertrack/usertrack.module').then(m=>m.UsertrackModule)
      }
  

    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
