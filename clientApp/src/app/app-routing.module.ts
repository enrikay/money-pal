import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/signup/signup.module')
      .then(m => m.SignupModule)
  },
  {
    path: 'confirm/:token',
    loadChildren: () => import('./pages/auth/verify-account/verify-account.module')
      .then(m => m.VerifyAccountModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
