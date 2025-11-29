import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService, Usuario } from '../../services/usuarios';

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

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private usuariosService: UsuariosService
  ) {
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
      const novoUsuario: Usuario = {
        nome: this.cadastroForm.value.nome,
        email: this.cadastroForm.value.email,
        genero: this.cadastroForm.value.sexo,
        senha: this.cadastroForm.value.senha,
        preferenciaNotificacao: true
      };

      this.usuariosService.createUsuario(novoUsuario).subscribe({
        next: (usuario) => {
          console.log('Usuário cadastrado:', usuario);
          alert('Cadastro realizado com sucesso!');
          this.cadastroForm.reset();
          this.mostrarCadastro = false; // Muda para tela de login
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          alert('Erro ao realizar cadastro! Tente novamente.');
        }
      });
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;

      // Buscar todos os usuários e validar localmente (simplificado)
      this.usuariosService.getUsuarios().subscribe({
        next: (usuarios) => {
          const usuarioEncontrado = usuarios.find(
            u => u.email === email && u.senha === senha
          );

          if (usuarioEncontrado) {
            console.log('Login bem-sucedido:', usuarioEncontrado);
            alert(`Bem-vinda, ${usuarioEncontrado.nome}!`);
            
            // Salvar dados do usuário (pode usar localStorage ou service)
            localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
            
            this.router.navigate(['/profile']);
          } else {
            alert('Email ou senha incorretos!');
          }
        },
        error: (erro) => {
          console.error('Erro ao fazer login:', erro);
          alert('Erro ao fazer login! Tente novamente.');
        }
      });
    } else {
      alert('Preencha email e senha!');
    }
  }

  alternarFormulario() {
    this.mostrarCadastro = !this.mostrarCadastro;
  }
}