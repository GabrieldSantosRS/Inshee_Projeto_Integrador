import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  codigo?: number;
  nome: string;
  email: string;
  dataNascimento?: string;
  genero: string;
  senha: string;
  preferenciaNotificacao?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'https://psychic-guide-9766799g4w693ppqq-8080.app.github.dev/usuarios';

  constructor(private http: HttpClient) {}

  // Listar todos os usuários
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Buscar usuário por código
  getUsuario(codigo: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${codigo}`);
  }

  // Criar novo usuário (cadastro)
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // Validar login (busca por email e senha)
  validarLogin(email: string, senha: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&senha=${senha}`);
  }
}