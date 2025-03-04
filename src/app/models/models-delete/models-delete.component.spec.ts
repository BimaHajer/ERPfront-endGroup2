import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsDeleteComponent } from './models-delete.component';

describe('ModelsDeleteComponent', () => {
  let component: ModelsDeleteComponent;
  let fixture: ComponentFixture<ModelsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelsDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
