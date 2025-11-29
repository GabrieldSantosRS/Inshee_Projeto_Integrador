import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class AppModule { }