import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsEditComponent } from './models-edit.component';

describe('ModelsEditComponent', () => {
  let component: ModelsEditComponent;
  let fixture: ComponentFixture<ModelsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
