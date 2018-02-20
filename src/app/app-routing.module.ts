import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {ProfileComponent} from './user/profile/profile.component';
import {FileSystemComponent} from './home/file-system/file-system.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {NewUserComponent} from './user/new-user/new-user.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'new-user',
    component: NewUserComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'file-system',
    component: FileSystemComponent
  },
  { path: '**', component: PageNotFoundComponent } // This must be last!
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
