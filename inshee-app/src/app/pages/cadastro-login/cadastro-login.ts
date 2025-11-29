import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-login',
  standalone: false,
  templateUrl: './cadastro-login.html',
  styleUrl: './cadastro-login.css',
})
export class CadastroLogin {
  cadastroForm: FormGroup;
  loginForm: FormGroup;
  mostrarCadastro: boolean = true;

  constructor(private fb: FormBuilder, private router: Router) {
    // Formulário de Cadastro
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      sexo: ['', Validators.required]
    });

    // Formulário de Login
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onCadastro() {
    if (this.cadastroForm.valid) {
      console.log('Cadastro:', this.cadastroForm.value);
      alert('Cadastro realizado com sucesso!');
      this.mostrarCadastro = false;
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      alert('Login realizado!');
      this.router.navigate(['/profile']);
    } else {
      alert('Preencha email e senha!');
    }
  }

  alternarFormulario() {
    this.mostrarCadastro = !this.mostrarCadastro;
  }
}