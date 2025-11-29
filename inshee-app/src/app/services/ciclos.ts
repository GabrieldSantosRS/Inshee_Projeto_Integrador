import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  codigo: number;
  nome: string;
  email: string;
  dataNascimento: string;
  genero: string;
  preferenciaNotificacao: boolean;
  senha: string;
}

export interface CicloMenstrual {
  codigo?: number;
  dataInicio: string;
  duracaoCiclo: number;
  duracaoMenstruacao: number;
  usuario?: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class CiclosService {
  private apiUrl = 'https://psychic-guide-9766799g4w693ppqq-8080.app.github.dev/ciclosmenstruais';

  constructor(private http: HttpClient) {}

  getCiclos(): Observable<CicloMenstrual[]> {
    return this.http.get<CicloMenstrual[]>(this.apiUrl);
  }

  getCiclo(codigo: number): Observable<CicloMenstrual> {
    return this.http.get<CicloMenstrual>(`${this.apiUrl}/${codigo}`);
  }

  createCiclo(ciclo: CicloMenstrual): Observable<CicloMenstrual> {
    return this.http.post<CicloMenstrual>(this.apiUrl, ciclo);
  }

  updateCiclo(codigo: number, ciclo: CicloMenstrual): Observable<CicloMenstrual> {
    return this.http.put<CicloMenstrual>(`${this.apiUrl}/${codigo}`, ciclo);
  }

  deleteCiclo(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }
}