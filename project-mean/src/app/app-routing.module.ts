import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardHome } from './shared/auth-guard-home.service';
import { AuthGuard } from './shared/auth-guard.service';
import { UsersOnlineComponent } from './users-online/users-online.component';

const routes: Routes = [
  { path: '',  redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'online-users', component: UsersOnlineComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard], data: { animation: 'isRight' } },
  { path: 'edit/:id', component: PostCreateComponent, canActivate: [AuthGuard], data: { animation: 'isLeft' } },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardHome] },
  { path: 'auth', component: AuthComponent, canActivate: [AuthGuardHome] },
  { path: 'not-found', component: NotFoundComponent, data: { message: 'PAGE NOT FOUND'} },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
