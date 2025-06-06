import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarComponent } from './actualizar.component';

describe('FormularioComponent', () => {
  let component: ActualizarComponent;
  let fixture: ComponentFixture<ActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
