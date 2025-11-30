import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CiclosService, CicloMenstrual } from '../../services/ciclos';

interface RegistroDiario {
  id: number;
  data: string;
  titulo: string;
  conteudo: string;
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  usuario = {
    nome: 'Ana Silva',
    email: 'ana.silva@gmail.com',
    telefone: '',
    dataNascimento: '1995-05-10',
    genero: 'Feminino'
  };

  abaAtiva: string = 'ciclos';

  ciclos: CicloMenstrual[] = [];
  mostrarFormulario: boolean = false;
  cicloSelecionado: CicloMenstrual | null = null;
  
  dataInicio: string = '';
  duracaoCiclo: number = 28;
  duracaoMenstruacao: number = 5;

  registrosDiarios: RegistroDiario[] = [];
  mostrarFormularioDiario: boolean = false;
  diarioSelecionado: RegistroDiario | null = null;
  diarioData: string = '';
  diarioTitulo: string = '';
  diarioConteudo: string = '';

  mostrarEditarPerfil: boolean = false;
  mostrarTrocarSenha: boolean = false;

  constructor(
    private router: Router,
    private ciclosService: CiclosService
  ) {}

  ngOnInit() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }
    
    this.carregarCiclos();
    this.carregarDiarios();
  }

  trocarAba(aba: string) {
    this.abaAtiva = aba;
  }

  abrirEditarPerfil() {
    this.mostrarEditarPerfil = true;
  }

  fecharEditarPerfil() {
    this.mostrarEditarPerfil = false;
  }

  salvarPerfil() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    alert('Perfil atualizado com sucesso!');
    this.fecharEditarPerfil();
  }

  abrirTrocarSenha() {
    this.mostrarTrocarSenha = true;
  }

  fecharTrocarSenha() {
    this.mostrarTrocarSenha = false;
  }

  salvarSenha() {
    alert('Senha alterada com sucesso!');
    this.fecharTrocarSenha();
  }

  carregarCiclos() {
    this.ciclosService.getCiclos().subscribe({
      next: (dados) => {
        this.ciclos = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar ciclos:', erro);
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
      this.ciclosService.updateCiclo(this.cicloSelecionado.codigo!, ciclo).subscribe({
        next: () => {
          alert('Ciclo atualizado!');
          this.carregarCiclos();
          this.fecharFormulario();
        },
        error: () => alert('Erro!')
      });
    } else {
      this.ciclosService.createCiclo(ciclo).subscribe({
        next: () => {
          alert('Ciclo adicionado!');
          this.carregarCiclos();
          this.fecharFormulario();
        },
        error: () => alert('Erro!')
      });
    }
  }

  deletarCiclo(codigo: number) {
    if (confirm('Excluir?')) {
      this.ciclosService.deleteCiclo(codigo).subscribe({
        next: () => {
          alert('Excluído!');
          this.carregarCiclos();
        },
        error: () => alert('Erro!')
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

  carregarDiarios() {
    const salvos = localStorage.getItem('registrosDiarios');
    if (salvos) {
      this.registrosDiarios = JSON.parse(salvos);
    }
  }

  abrirFormularioDiario() {
  this.mostrarFormularioDiario = true;
  this.diarioSelecionado = null;
  this.diarioData = '';
  this.diarioTitulo = '';
  this.diarioConteudo = '';
}

  editarDiario(diario: RegistroDiario) {
    this.mostrarFormularioDiario = true;
    this.diarioSelecionado = diario;
    this.diarioData = diario.data;
    this.diarioTitulo = diario.titulo;
    this.diarioConteudo = diario.conteudo;
  }

  salvarDiario() {
    if (this.diarioSelecionado) {
      const index = this.registrosDiarios.findIndex(d => d.id === this.diarioSelecionado!.id);
      this.registrosDiarios[index] = {
        id: this.diarioSelecionado.id,
        data: this.diarioData,
        titulo: this.diarioTitulo,
        conteudo: this.diarioConteudo
      };
    } else {
      this.registrosDiarios.push({
        id: Date.now(),
        data: this.diarioData,
        titulo: this.diarioTitulo,
        conteudo: this.diarioConteudo
      });
    }

    localStorage.setItem('registrosDiarios', JSON.stringify(this.registrosDiarios));
    this.registrosDiarios.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    alert('Salvo!');
    this.fecharFormularioDiario();
  }

  deletarDiario(id: number) {
    if (confirm('Excluir?')) {
      this.registrosDiarios = this.registrosDiarios.filter(d => d.id !== id);
      localStorage.setItem('registrosDiarios', JSON.stringify(this.registrosDiarios));
      alert('Excluído!');
    }
  }

  fecharFormularioDiario() {
    this.mostrarFormularioDiario = false;
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/cadastro']);
  }
}