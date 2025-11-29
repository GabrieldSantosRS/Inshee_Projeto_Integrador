import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLogin } from './cadastro-login';

describe('CadastroLogin', () => {
  let component: CadastroLogin;
  let fixture: ComponentFixture<CadastroLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
