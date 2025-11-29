import { Routes } from '@angular/router';
import { CadastroLogin } from './pages/cadastro-login/cadastro-login';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroLogin },
  { path: 'profile', component: Profile }
];