import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaAddComponent } from './tva-add.component';

describe('TvaAddComponent', () => {
  let component: TvaAddComponent;
  let fixture: ComponentFixture<TvaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvaAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
