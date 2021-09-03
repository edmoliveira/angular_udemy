import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { ServerLoadComponent } from './servers/server-load/server-load.component';
import { ServerEditComponent } from './servers/server-edit/server-edit.component';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { ClientComponent } from './client/client.component';
import { ClientResolver } from './client/client-resolver.service';

const routes: Routes = [
    { path: '', canActivate: [AuthGuard], component: HomeComponent }
    , { path: 'client', canActivate: [AuthGuard], component: ClientComponent }
    , { path: 'client/:id', canActivate: [AuthGuard], component: ClientComponent, resolve: { clientResolver: ClientResolver } }
    , { path: 'servers', canActivate: [AuthGuard], canActivateChild: [AuthGuard], component: ServersComponent, children: 
      [
        { path: ':id/:name', component: ServerLoadComponent }
        , { path: ':id', component: ServerEditComponent }
      ] 
    }
    , { path: 'users', canActivate: [AuthGuard], canActivateChild: [AuthGuard],component: UsersComponent, children: 
        [
            { path: ':id', component: UsersComponent }
        ] 
     }
    , { path: 'login', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: LoginComponent  }
    , { path: 'not-found', component: NotFoundComponent, data: { message: 'PAGE NOT FOUND'} }
    , { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
  ]

  //RouterModule.forRoot(routes, {useHash: true})

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}