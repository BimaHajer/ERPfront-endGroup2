import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandEditComponent } from './brands-edit.component';

describe('BrandsEditComponent', () => {
  let component: BrandEditComponent;
  let fixture: ComponentFixture<BrandEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
