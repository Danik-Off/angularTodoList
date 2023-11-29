import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent , },
  { path: 'main', component: MainComponent, canActivate:[authGuard]},
  { path: '', redirectTo: 'main', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
