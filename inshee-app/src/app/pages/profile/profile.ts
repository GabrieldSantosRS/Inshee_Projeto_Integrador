import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CiclosService, CicloMenstrual } from '../../services/ciclos';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  nomeUsuario: string = 'Usuária';
  ciclos: CicloMenstrual[] = [];
  mostrarFormulario: boolean = false;
  cicloSelecionado: CicloMenstrual | null = null;
  
  // Dados do formulário
  dataInicio: string = '';
  duracaoCiclo: number = 28;
  duracaoMenstruacao: number = 5;

  constructor(
    private router: Router,
    private ciclosService: CiclosService
  ) {}

  ngOnInit() {
    this.carregarCiclos();
  }

  carregarCiclos() {
    this.ciclosService.getCiclos().subscribe({
      next: (dados) => {
        this.ciclos = dados;
        console.log('Ciclos carregados:', dados);
      },
      error: (erro) => {
        console.error('Erro ao carregar ciclos:', erro);
        alert('Erro ao carregar ciclos!');
      }
    });
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.cicloSelecionado = null;
    this.limparFormulario();
  }

  editarCiclo(ciclo: CicloMenstrual) {
    this.mostrarFormulario = true;
    this.cicloSelecionado = ciclo;
    this.dataInicio = ciclo.dataInicio;
    this.duracaoCiclo = ciclo.duracaoCiclo;
    this.duracaoMenstruacao = ciclo.duracaoMenstruacao;
  }

  salvarCiclo() {
    const ciclo: CicloMenstrual = {
      dataInicio: this.dataInicio,
      duracaoCiclo: this.duracaoCiclo,
      duracaoMenstruacao: this.duracaoMenstruacao
    };

    if (this.cicloSelecionado) {
      // Editar
      this.ciclosService.updateCiclo(this.cicloSelecionado.codigo!, ciclo).subscribe({
        next: () => {
          alert('Ciclo atualizado com sucesso!');
          this.carregarCiclos();
          this.fecharFormulario();
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
          alert('Erro ao atualizar ciclo!');
        }
      });
    } else {
      // Criar novo
      this.ciclosService.createCiclo(ciclo).subscribe({
        next: () => {
          alert('Ciclo adicionado com sucesso!');
          this.carregarCiclos();
          this.fecharFormulario();
        },
        error: (erro) => {
          console.error('Erro ao criar:', erro);
          alert('Erro ao criar ciclo!');
        }
      });
    }
  }

  deletarCiclo(codigo: number) {
    if (confirm('Tem certeza que deseja excluir este ciclo?')) {
      this.ciclosService.deleteCiclo(codigo).subscribe({
        next: () => {
          alert('Ciclo excluído com sucesso!');
          this.carregarCiclos();
        },
        error: (erro) => {
          console.error('Erro ao deletar:', erro);
          alert('Erro ao excluir ciclo!');
        }
      });
    }
  }

  fecharFormulario() {
    this.mostrarFormulario = false;
    this.limparFormulario();
  }

  limparFormulario() {
    this.dataInicio = '';
    this.duracaoCiclo = 28;
    this.duracaoMenstruacao = 5;
  }

  logout() {
    this.router.navigate(['/cadastro']);
  }
}