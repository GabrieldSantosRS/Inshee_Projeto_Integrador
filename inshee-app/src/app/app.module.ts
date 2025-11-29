import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CadastroLogin } from './pages/cadastro-login/cadastro-login';
import { Profile } from './pages/profile/profile';

@NgModule({
  declarations: [
    CadastroLogin,
    Profile
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class AppModule { }