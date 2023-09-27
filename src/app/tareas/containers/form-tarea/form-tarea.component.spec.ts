import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTareaComponent } from './form-tarea.component';

describe('FormTareaComponent', () => {
  let component: FormTareaComponent;
  let fixture: ComponentFixture<FormTareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormTareaComponent]
    });
    fixture = TestBed.createComponent(FormTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
