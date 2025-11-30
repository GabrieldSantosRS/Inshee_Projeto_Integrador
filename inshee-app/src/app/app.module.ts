import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CadastroLogin } from './pages/cadastro-login/cadastro-login';
import { Profile } from './pages/profile/profile';
import { Home } from './pages/home/home';

@NgModule({
  declarations: [
    CadastroLogin,
    Profile,
    Home
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class AppModule { }