import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasVencidasComponent } from './tareas-vencidas.component';

describe('TareasVencidasComponent', () => {
  let component: TareasVencidasComponent;
  let fixture: ComponentFixture<TareasVencidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TareasVencidasComponent]
    });
    fixture = TestBed.createComponent(TareasVencidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
