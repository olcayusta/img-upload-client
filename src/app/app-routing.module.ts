import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';

const routes: Routes = [
  {path: '404', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)},
  {
    path: '',
    component: SidenavContainerComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'help', loadChildren: () => import('./help/help.module').then(m => m.HelpModule)},
      {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
      {path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
      {path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)},
      {path: 'p/:id', pathMatch: 'full', loadChildren: () => import('./post/post.module').then(m => m.PostModule)}
    ]
  },
  {path: ':**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)},
  {path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    urlUpdateStrategy: 'eager'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
