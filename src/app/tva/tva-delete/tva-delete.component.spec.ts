import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaDeleteComponent } from './tva-delete.component';

describe('TvaDeleteComponent', () => {
  let component: TvaDeleteComponent;
  let fixture: ComponentFixture<TvaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvaDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
