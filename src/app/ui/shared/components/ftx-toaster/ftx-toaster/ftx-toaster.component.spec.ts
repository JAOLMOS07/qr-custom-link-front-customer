import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtxToasterComponent } from './ftx-toaster.component';

describe('FtxToasterComponent', () => {
  let component: FtxToasterComponent;
  let fixture: ComponentFixture<FtxToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtxToasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtxToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
