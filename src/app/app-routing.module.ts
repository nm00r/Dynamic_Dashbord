import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Component/user/user.component';
import { UserDetailsComponent } from './Component/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: UserComponent, title: 'users' },
  { path: 'user', component: UserComponent, title: 'users' },
  { path: 'userdetails/:id', component: UserDetailsComponent, title: 'user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
