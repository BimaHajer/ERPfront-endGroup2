import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDeleteComponent } from './provider-delete.component';

describe('ProviderDeleteComponent', () => {
  let component: ProviderDeleteComponent;
  let fixture: ComponentFixture<ProviderDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
