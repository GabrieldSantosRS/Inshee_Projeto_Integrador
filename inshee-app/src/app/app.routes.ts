import { Routes } from '@angular/router';
import { CadastroLogin } from './pages/cadastro-login/cadastro-login';
import { Profile } from './pages/profile/profile';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cadastro', component: CadastroLogin },
  { path: 'profile', component: Profile }
];