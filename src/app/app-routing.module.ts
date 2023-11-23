import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from './core';

const routes: Routes = [
    { path: '', redirectTo: AppConfig.routes.modules.dashboard, pathMatch: 'full' },
    {
        path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
