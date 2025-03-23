import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultipleImageComponent } from './upload-multiple-image.component';

describe('UploadMultipleImageComponent', () => {
  let component: UploadMultipleImageComponent;
  let fixture: ComponentFixture<UploadMultipleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadMultipleImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadMultipleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
