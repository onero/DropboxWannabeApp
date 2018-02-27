import {RouterModule} from '@angular/router';
import {NewUserComponent} from './user/new-user/new-user.component';
import {FileSystemComponent} from './home/file-system/file-system.component';
import {LoginComponent} from './auth/login/login.component';
import {ProfileComponent} from './user/profile/profile.component';
import {AuthGuard} from './auth/auth.guard';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';

export const AppRoutes = RouterModule.forRoot(
  [
    { path: '',
      redirectTo: 'file-system',
      pathMatch: 'full'
    },
    {
      path: 'file-system',
      component: FileSystemComponent,
      canActivate: [AuthGuard]
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
      component: ProfileComponent,
      canActivate: [AuthGuard]
    },
    { path: '**', component: PageNotFoundComponent } // This must be last!
  ]
);
