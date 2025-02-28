import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaDetailComponent } from './tva-detail.component';

describe('TvaDetailComponent', () => {
  let component: TvaDetailComponent;
  let fixture: ComponentFixture<TvaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
