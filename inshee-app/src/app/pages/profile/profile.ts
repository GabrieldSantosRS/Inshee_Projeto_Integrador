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
  // Dados do usuário
  usuario = {
    nome: 'Ana Silva',
    email: 'ana.silva@gmail.com',
    telefone: '',
    dataNascimento: '1995-05-10',
    genero: 'Feminino'
  };

  // Abas
  abaAtiva: string = 'ciclos';

  // Ciclos
  ciclos: CicloMenstrual[] = [];
  mostrarFormulario: boolean = false;
  cicloSelecionado: CicloMenstrual | null = null;
  
  dataInicio: string = '';
  duracaoCiclo: number = 28;
  duracaoMenstruacao: number = 5;

  // Diário
  registrosDiarios: RegistroDiario[] = [];
  mostrarFormularioDiario: boolean = false;
  diarioSelecionado: RegistroDiario | null = null;
  diarioData: string = '';
  diarioTitulo: string = '';
  diarioConteudo: string = '';

  // Edição de perfil
  mostrarEditarPerfil: boolean = false;
  mostrarTrocarSenha: boolean = false;

  constructor(
    private router: Router,
    private ciclosService: CiclosService
  ) {}

  ngOnInit() {
    // Tentar pegar dados do localStorage
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

  // ===== FUNÇÕES DE CICLOS =====
  carregarCiclos() {
    this.ciclosService.getCiclos().subscribe({
      next: (dados) => {
        this.ciclos = dados;
        console.log('Ciclos carregados:', dados);
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

  // ===== FUNÇÕES DE DIÁRIO =====
  carregarDiarios() {
    const diariosSalvos = localStorage.getItem('registrosDiarios');
    if (diariosSalvos) {
      this.registrosDiarios = JSON.parse(diariosSalvos);
    }
  }

  abrirFormularioDiario() {
    this.mostrarFormularioDiario = true;
    this.diarioSelecionado = null;
    this.limparFormularioDiario();
  }

  editarDiario(diario: RegistroDiario) {
    this.mostrarFormularioDiario = true;
    this.diarioSelecionado = diario;
    this.diarioData = diario.data;
    this.diarioTitulo = diario.titulo;
    this.diarioConteudo = diario.conteudo;
  }

  salvarDiario() {
    if (!this.diarioData || !this.diarioTitulo || !this.diarioConteudo) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.diarioSelecionado) {
      // Editar
      const index = this.registrosDiarios.findIndex(d => d.id === this.diarioSelecionado!.id);
      this.registrosDiarios[index] = {
        id: this.diarioSelecionado.id,
        data: this.diarioData,
        titulo: this.diarioTitulo,
        conteudo: this.diarioConteudo
      };
      alert('Registro atualizado com sucesso!');
    } else {
      // Criar novo
      const novoRegistro: RegistroDiario = {
        id: Date.now(),
        data: this.diarioData,
        titulo: this.diarioTitulo,
        conteudo: this.diarioConteudo
      };
      this.registrosDiarios.push(novoRegistro);
      alert('Registro adicionado com sucesso!');
    }

    // Salvar no localStorage
    localStorage.setItem('registrosDiarios', JSON.stringify(this.registrosDiarios));
    
    // Ordenar por data (mais recente primeiro)
    this.registrosDiarios.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    
    this.fecharFormularioDiario();
  }

  deletarDiario(id: number) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      this.registrosDiarios = this.registrosDiarios.filter(d => d.id !== id);
      localStorage.setItem('registrosDiarios', JSON.stringify(this.registrosDiarios));
      alert('Registro excluído com sucesso!');
    }
  }

  fecharFormularioDiario() {
    this.mostrarFormularioDiario = false;
    this.limparFormularioDiario();
  }

  limparFormularioDiario() {
    this.diarioData = '';
    this.diarioTitulo = '';
    this.diarioConteudo = '';
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/cadastro']);
  }
}