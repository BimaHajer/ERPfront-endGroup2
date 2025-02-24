import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaListComponent } from './tva-list.component';

describe('TvaListComponent', () => {
  let component: TvaListComponent;
  let fixture: ComponentFixture<TvaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
