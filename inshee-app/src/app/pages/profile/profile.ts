import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  nomeUsuario: string = 'Usuária';

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/cadastro']);
  }
}