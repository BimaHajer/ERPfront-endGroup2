import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaEditComponent } from './tva-edit.component';

describe('TvaEditComponent', () => {
  let component: TvaEditComponent;
  let fixture: ComponentFixture<TvaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
