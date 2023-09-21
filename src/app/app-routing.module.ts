import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteHelper } from './helpers/route.helper';

const routes: Routes = [
  {
    path: RouteHelper.EMPTY_PATH,
    loadChildren: () => import('./modules/+dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: RouteHelper.PLATES_LIST_PATH,
    loadChildren: () => import('./modules/+plates-list/plates-list.module').then(m => m.PlatesListModule)
  },
  {
    path: '**',
    redirectTo: RouteHelper.EMPTY_PATH,
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
